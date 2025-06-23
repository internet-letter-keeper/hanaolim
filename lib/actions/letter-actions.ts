"use server";

import prisma from "@/lib/db";
import { Letter } from "@/types/letters";

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

    const letters: Letter[] = lettersList.map((l) => ({
      letterId: l.letterId,
      nickname: l.nickname ?? "",
      content: l.content,
      fileUrl: l.fileUrl ?? undefined,
      iconId: l.iconId ?? undefined,
      createDate: l.createDate.toISOString(),
      readDate: l.readDate ? l.readDate.toISOString() : null,
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
 * @usage 편지 상세페이지
 * @returns 
 */
export const getLetterDetail = async (letterId: number, userId: number) => {
  try {
    const letter = await prisma.letter.findUnique({
      where: {
        letterId,
      },
      include: {
        Favorite: true,
        User_Letter_receiverIdToUser: true,
        User_Letter_senderIdToUser: true,
      },
    });

    if (!letter) {
      return { ok: false, data: null };
    }

    const result: Letter = {
      letterId: letter.letterId,
      nickname: letter.nickname ?? "",
      content: letter.content,
      fileUrl: letter.fileUrl ?? undefined,
      iconId: letter.iconId ?? undefined,
      createDate: letter.createDate.toISOString(),
      readDate: letter.readDate ? letter.readDate.toISOString() : null,
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
    console.error("편지 상세 조회 에러:", error);
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
 * 읽지 않은 편지 존재 유무
 * @param userId number - 현재 로그인한 유저 ID
 * @returns { isNew : boolean }
 */
export const getIsNew = async (userId: number) => {
  console.log("dddd");
  const unreadCount = await prisma.letter.count({
    where: {
      receiverId: userId,
      readDate: null,
    },
  });
  const isNew = unreadCount > 0 ? true : false;
  return { isNew };
};
