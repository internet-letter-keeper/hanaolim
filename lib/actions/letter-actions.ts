"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";
import { Prisma } from "../generated/prisma";

type LetterDetailProp = {
  letterId: number;
  userId: number;
  isReply?: boolean;
};

/**
 * 편지 상세 조회 api
 * @param letterId
 * @param userId
 * @usage 편지 상세 페이지
 * @returns
 */
export const getLetterDetail = async ({
  letterId,
  userId,
  isReply,
}: LetterDetailProp) => {
  try {
    const letter = await prisma.letter.findFirst({
      where: isReply
        ? {
            parentLetterId: letterId,
            OR: [{ senderId: userId }, { receiverId: userId }],
          }
        : { letterId, OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        Favorite: true,
        User_Letter_receiverIdToUser: { select: { userName: true } },
        User_Letter_senderIdToUser: { select: { userName: true } },
      },
    });

    const hasReplyLetter = await prisma.letter.findFirst({
      where: {
        parentLetterId: letterId,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    const result = {
      ...letter,
      receiverName: letter?.User_Letter_receiverIdToUser?.userName,
      senderName: letter?.User_Letter_senderIdToUser?.userName,
      isFavorite: letter?.Favorite.some(
        (f) => f.userId === userId && f.isFavorite
      ),
      hasReply: !!hasReplyLetter,
    };
    return { ok: true, data: result };
  } catch {
    return { ok: false, data: null };
  }
};

/**
 *
// 즐겨찾기 추가 삭제 api
 * @param letterId
 * @param userId
 * @usage 편지 보관함
 * @returns
 */
export const patchFavorite = async (letterId: number, userId: number) => {
  try {
    // 현재 즐겨찾기 상태 확인
    const existing = await prisma.favorite.findFirst({
      where: {
        letterId,
        userId,
      },
    });

    if (existing) {
      // 있으면 즐겨찾기 해제
      await prisma.favorite.delete({
        where: {
          favoriteId: existing.favoriteId,
        },
      });
      return { ok: true, isFavorite: false };
    } else {
      // 없으면 즐겨찾기
      await prisma.favorite.create({
        data: {
          letterId,
          userId,
          isFavorite: true,
        },
      });
      return { ok: true, isFavorite: true };
    }
  } catch {
    return { ok: false, isFavorite: null };
  }
};

/**
 * 군인이 받은 원본 편지의 개수
 * @param userId 군인의 userId
 * @returns 받은 원본 편지의 개수
 * @usage 관물대 페이지네이션
 */
export const getLettersCntByUserId = async (userId: number) =>
  prisma.letter.count({
    where: {
      receiverId: userId,
      parentLetterId: null,
    },
  });

/**
 * 답장이 아닌 원본 편지만 가져오기, 7개씩 페이지네이션
 * @param userId
 * @param page 페이지네이션. 가져올 페이지
 * @param lettersCnt 군인이 받은 편지의 총 개수
 * @usage 관물대
 * @returns 받은 원본 편지[]
 */
export const getLettersByUserId = async (
  userId: number,
  page: number = 1,
  lettersCnt: number
) => {
  try {
    const FIRST_PAGE_SIZE = lettersCnt % 7 || 7;
    const PAGE_SIZE = 7;

    let skip = 0;
    let take = 0;

    if (page === 1) {
      take = FIRST_PAGE_SIZE;
    } else {
      skip = FIRST_PAGE_SIZE + (page - 2) * PAGE_SIZE;
      take = PAGE_SIZE;
    }

    const letters = await prisma.letter.findMany({
      where: {
        receiverId: userId,
        parentLetterId: null,
      },
      orderBy: {
        createDate: "desc",
      },
      skip,
      take,
    });

    return {
      ok: true,
      data: letters.sort(
        (a, b) => a.createDate.getTime() - b.createDate.getTime()
      ),
    };
  } catch {
    return { ok: false, data: null };
  }
};

/*
 * 읽지 않은 편지 존재 유무
 * @param userId number - 현재 로그인한 유저 ID
 * @returns { isNew : boolean }
 */
export const getIsNew = async (userId: number) => {
  const unreadCount = await prisma.letter.count({
    where: {
      receiverId: userId,
      readDate: null,
    },
  });
  const isNew = unreadCount > 0 ? true : false;
  return { isNew };
};

// 필터 작업 -> 내 관물대 / 친구 관물대 + 즐겨찾기, 안읽음, 답장옴
type FilteredLettersParams = {
  box: "mine" | "friend";
  userId: number;
  isFavorite?: boolean;
  isUnread?: boolean;
  hasReply?: boolean;
  query?: string;
};

/**
 * 필터와 검색 결과에 따른 편지 목록 불러오기
 * @param param0
 * @usage 편지 목록 페이지
 * @returns
 */
export const getFilteredLetters = async ({
  box,
  userId,
  isFavorite,
  isUnread,
  hasReply,
  query,
}: FilteredLettersParams) => {
  try {
    const where: Prisma.LetterWhereInput = {
      parentLetterId: null,
    };

    // 받은편지함
    if (box === "mine") {
      where.receiverId = userId;

      if (isUnread === true) {
        where.readDate = null;
      }

      if (query) {
        where.OR = [
          { content: { contains: query } },
          {
            User_Letter_senderIdToUser: { userName: { contains: query } },
          },
        ];
      }

      const rawLetters = await prisma.letter.findMany({
        where,
        orderBy: { createDate: "desc" },
        include: {
          Favorite: true,
          User_Letter_senderIdToUser: true,
        },
      });

      // 내가 쓴 답장
      const myReplies = await prisma.letter.findMany({
        where: {
          senderId: userId,
          parentLetterId: { not: null },
        },
        select: {
          parentLetterId: true,
        },
      });

      const myReplySet = new Set(myReplies.map((r) => r.parentLetterId));

      const filtered = rawLetters.filter((letter) => {
        const myFavorite = letter.Favorite.find((f) => f.userId === userId);
        return isFavorite ? myFavorite?.isFavorite === true : true;
      });

      const result = filtered.map((letter) => {
        const myFavorite = letter.Favorite.find((f) => f.userId === userId);
        return {
          ...letter,
          favoriteId: myFavorite?.favoriteId,
          isFavorite: myFavorite?.isFavorite,
          senderName: letter.User_Letter_senderIdToUser?.userName ?? "",
          receiverName: "",
          hasReply: myReplySet.has(letter.letterId),
        };
      });

      return { ok: true, data: result };
    } else {
      // 보낸 편지함
      where.senderId = userId;

      if (query) {
        where.OR = [
          { content: { contains: query } },
          {
            User_Letter_receiverIdToUser: { userName: { contains: query } },
          },
        ];
      }

      const rawLetters = await prisma.letter.findMany({
        where,
        orderBy: { createDate: "desc" },
        include: {
          Favorite: true,
          User_Letter_receiverIdToUser: true,
        },
      });

      const letterIds = rawLetters.map((letter) => letter.letterId);

      // 내가 받은 답장
      const replyMap = await prisma.letter.findMany({
        where: {
          parentLetterId: { in: letterIds },
        },
        select: {
          parentLetterId: true,
        },
      });

      const hasReplySet = new Set(replyMap.map((r) => r.parentLetterId));

      const filtered = rawLetters.filter((letter) => {
        const myFavorite = letter.Favorite.find((f) => f.userId === userId);
        const matchFavorite = isFavorite
          ? myFavorite?.isFavorite === true
          : true;
        const matchReply = hasReply ? hasReplySet.has(letter.letterId) : true;
        return matchFavorite && matchReply;
      });

      const result = filtered.map((letter) => {
        const myFavorite = letter.Favorite.find((f) => f.userId === userId);
        return {
          ...letter,
          favoriteId: myFavorite?.favoriteId,
          isFavorite: myFavorite?.isFavorite,
          receiverName: letter.User_Letter_receiverIdToUser?.userName ?? "",
          senderName: "",
          hasReply: hasReplySet.has(letter.letterId),
        };
      });

      return { ok: true, data: result };
    }
  } catch {
    return { ok: false, error: "편지 필터링에 실패했습니다." };
  }
};

export const revalidateLetters = async () => {
  revalidatePath("/letters");
};

/**
 * 일반 회원이 편지를 읽었을 경우 읽음 처리
 * @param letterId
 * @param userId
 * @usage 편지 상세 조회 페이지
 * @returns
 */
export const patchUserReadDate = async (letterId: number, userId: number) => {
  try {
    const res = await prisma.letter.updateMany({
      where: {
        letterId,
        receiverId: userId,
        readDate: null,
      },
      data: {
        readDate: new Date(),
      },
    });

    return {
      success: true,
      updated: res.count > 0,
    };
  } catch {
    return {
      success: false,
      updated: false,
    };
  }
};
