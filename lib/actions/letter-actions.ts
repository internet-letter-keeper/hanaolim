import prisma from "@/lib/db";
import { Letter } from "../generated/prisma";

type LetterWithUsers = Letter & {
  User_Letter_senderIdToUser: { userName: string };
  User_Letter_receiverIdToUser: { userName: string };
};

export async function getAllLetters(): Promise<LetterWithUsers[]> {
  const letters = await prisma.letter.findMany({
    where: { parentLetterId: null }, // 답장이 아닌 원편지만 가져옴
    include: {
      User_Letter_senderIdToUser: {
        select: { userName: true },
      },
      User_Letter_receiverIdToUser: {
        select: { userName: true },
      },
    },
  });

  return letters;
}
