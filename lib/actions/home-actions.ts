"use server";

import prisma from "../db";

type ProfileInfo = {
  userName: string;
  startDate: string;
  endDate: string;
};

/**
 * 홈화면에 표시할 유저 이름 + 병사 날짜 정보 조회
 * @usage 홈 상단 프로필
 * @param userId number - 유저 ID
 * @returns { userName, startDate, endDate }
 * @throws userId를 가진 유저가 DB에 없을 때
 */
export const getProfileInfo = async (userId: number): Promise<ProfileInfo> => {
  const user = await prisma.user.findUnique({
    where: { userId },
    select: {
      userName: true,
      Soldier: {
        select: {
          startDate: true,
          endDate: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error(`${userId}번 유저는 존재하지 않습니다`);
  }

  const soldier = user.Soldier?.[0];
  if (!soldier) {
    throw new Error(`${userId}번 유저의 군 복무 정보가 없습니다`);
  }

  return {
    userName: user.userName,
    startDate: soldier.startDate.toISOString(),
    endDate: soldier.endDate.toISOString(),
  };
};
