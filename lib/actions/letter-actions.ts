"use server";

import prisma from "@/lib/db";
import { Letter } from "../generated/prisma";

type LetterWithUsers = Letter & {
  User_Letter_senderIdToUser: { userName: string };
  User_Letter_receiverIdToUser: { userName: string };
};

export const getAllLetters = async (): Promise<LetterWithUsers[]> => {
  const letters = await prisma.letter.findMany({
    where: { parentLetterId: null }, // 답장이 아닌 원편지만 가져옴
    include: {
      User_Letter_senderIdToUser: {
        select: { userName: true },
      },
      orderBy: {
        createDate: "desc",
      },
    });

    const letters: Letter[] = lettersFromDb.map((l) => ({
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
}

// 편지 상세 조회 api
export async function getLetterDetail(letterId: number, currentUserId: number) {
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
        (f) => f.userId === currentUserId && f.isFavorite
      ),
    };
    return { ok: true, data: result };
  } catch (error) {
    console.error("편지 상세 조회 에러:", error);
    return { ok: false, data: null };
  }
}
