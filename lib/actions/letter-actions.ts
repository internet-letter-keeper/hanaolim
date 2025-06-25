"use server";

import prisma from "@/lib/db";
import { Letter } from "@/types/letters";

type LetterDetailProp = {
  letterId: number;
  userId: number;
  isReply?: boolean; // 생략 시 false
};

/**
 * 편지 목록 불러오기 api
 * @param userId
 * @usage 편지 보관함
 * @returns userId에 해당하는 편지들 목록
 */
export const getLettersByUserId = async (userId: number) => {
  try {
    const lettersList = await prisma.letter.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        Favorite: true,
        User_Letter_receiverIdToUser: true,
        User_Letter_senderIdToUser: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });
    //TODO: 코드 리팩토링 필요
    const letters: Letter[] = lettersList.map((l) => ({
      letterId: l.letterId,
      nickname: l.nickname ?? "",
      content: l.content,
      fileUrl: l.fileUrl ?? undefined,
      iconId: l.iconId ?? undefined,
      createDate: l.createDate,
      readDate: l.readDate,
      parentLetterId: l.parentLetterId ?? null,
      receiverId: l.receiverId,
      senderId: l.senderId,
      receiverName: l.User_Letter_receiverIdToUser?.userName,
      senderName: l.User_Letter_senderIdToUser?.userName,
      isFavorite: l.Favorite.some((f) => f.userId === userId && f.isFavorite),
    }));

    return { ok: true, data: letters };
  } catch (error) {
    console.error("편지 불러오기 에러:", error);
    return { ok: false, data: null };
  }
};

/**
 * 
// 편지 상세 조회 api
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
  const where = isReply ? { parentLetterId: letterId } : { letterId };
  try {
    const letter = await prisma.letter.findFirst({
      where,
      include: {
        Favorite: true,
        User_Letter_receiverIdToUser: { select: { userName: true } },
        User_Letter_senderIdToUser: { select: { userName: true } },
      },
    });

    if (!letter) {
      return { ok: false, data: null };
    }

    //TODO: 코드 리팩토링 필요
    const result: Letter = {
      letterId: letter.letterId,
      nickname: letter.nickname ?? "",
      content: letter.content,
      fileUrl: letter.fileUrl ?? undefined,
      iconId: letter.iconId ?? undefined,
      createDate: letter.createDate,
      readDate: letter.readDate,
      parentLetterId: letter.parentLetterId ?? null,
      receiverId: letter.receiverId,
      senderId: letter.senderId,
      receiverName: letter.User_Letter_receiverIdToUser?.userName,
      senderName: letter.User_Letter_senderIdToUser?.userName,
      isFavorite: letter.Favorite.some(
        (f) => f.userId === userId && f.isFavorite
      ),
    };
    return { ok: true, data: result };
  } catch (error) {
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
  } catch (error) {
    console.error("즐겨찾기 실패:", error);
    return { ok: false, isFavorite: null };
  }
};

/**
 *
 * @param letterId
 * @usage 편지 상세 페이지
 * @returns 읽음 처리
 */
export async function patchReadDate(letterId: number) {
  try {
    prisma.letter.update({
      where: { letterId },
      data: { readDate: new Date() },
    });
    return { ok: true };
  } catch (err) {
    console.error("읽음 처리 실패", err);
    return { ok: false };
  }
}

/**
 * 군인이 받은 원본 편지의 개수
 * @param soldierId
 * @returns 받은 원본 편지[]
 */
export const getTotalReceivedNonReplyLettersCnt = async (soldierId: number) =>
  prisma.letter.count({
    where: {
      receiverId: soldierId,
      parentLetterId: null,
    },
  });

/**
 * 답장이 아닌 원본 편지만 가져오기, 7개씩 페이지네이션
 * @param userId
 * @param page 페이지네이션. 가져올 페이지
 * @param totalLettersCnt 군인이 받은 편지의 총 개수
 * @usage 관물대
 * @returns 받은 원본 편지[]
 */
export const getNonReplyLettersByUserId = async (
  userId: number,
  page: number = 1,
  totalLettersCnt: number
) => {
  try {
    const FIRST_PAGE_SIZE = totalLettersCnt % 7 || 7;
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
      data: letters,
    };
  } catch (error) {
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
type GetFilteredLettersParams = {
  box: "mine" | "friend";
  userId: number;
  isFavorite?: boolean;
  isUnread?: boolean;
  hasReply?: boolean;
  query?: string;
};

/**
 *
 * @param param0
 * @returns
 */
export const getFilteredLetters = async ({
  box,
  userId,
  isFavorite,
  isUnread,
  hasReply,
  query,
}: GetFilteredLettersParams) => {
  try {
    const where: any = {
      parentLetterId: null,
    };

    // 받은편지함
    if (box === "mine") {
      where.receiverId = userId;

      if (isUnread === false) {
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

      // 답장 존재 여부 조회
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
        };
      });

      return { ok: true, data: result };
    }
  } catch (error) {
    console.error("[getFilteredLetters]", error);
    return { ok: false, error: "편지 필터링에 실패했습니다." };
  }
};
