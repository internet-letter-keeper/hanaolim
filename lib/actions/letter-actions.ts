"use server";

import { Letter } from "@/types/letters";
import prisma from "@/lib/db";

export async function getLettersByUserId(userId: number) {
  try {
    const lettersFromDb = await prisma.letter.findMany({
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
