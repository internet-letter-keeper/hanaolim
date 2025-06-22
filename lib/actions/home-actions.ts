"use server";

import prisma from "../db";

/**
 * 홈화면에 표시할 유저 이름 조회
 * @usage 홈 상단 프로필
 * @param userId number - 유저 ID
 * @returns string - 유저 이름
 * @throws userId를 가진 유저가 DB에 없을 때
 */
export const getProfileInfo = async (userId: number): Promise<string> => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: { userName: true },
  });

  if (!user) {
    throw new Error(`${userId}번 유저는 존재하지 않습니다`);
  }

  return user.userName;
};
