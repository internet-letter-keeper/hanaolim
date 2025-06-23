"use server";

import prisma from "@/lib/db";
import { Letter } from "../generated/prisma";

/**
 * 편지 목록 불러오기 api
 * @param userId
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
      isFavorite: l.Favorite.some((f) => f.userId === userId && f.isFavorite),
    }));

    return { ok: true, data: letters };
  } catch (error) {
    console.error("편지 불러오기 에러:", error);
    return { ok: false, data: null };
  }
};

// 편지 상세 조회 api
export const getLetterDetail = async (letterId: number, userId: number) => {
  try {
    const letter = await prisma.letter.findUnique({
      where: {
        letterId,
      },
      include: {
        Favorite: true,
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

// 즐겨찾기 추가 삭제 api
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
