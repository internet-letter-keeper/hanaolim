"use server";

import prisma from "../db";

type ProfileInfo = {
  userName: string;
  startDate: string;
  endDate: string;
};

type CardInfo = {
  accountNum: string;
  accountBalance: number;
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

/**
 * 하나 나라사랑카드 정보 조회
 * @usage 카드 컴포넌트
 * @param userId number - 유저 ID
 * @returns { accountNum, accountBalance }
 * @throws 군 복무 정보 또는 계좌 정보가 없을 경우
 */
export const getCardInfo = async (userId: number): Promise<CardInfo> => {
  const soldier = await prisma.soldier.findFirst({
    where: { userId },
    select: {
      soldierId: true,
      Account: {
        select: {
          accountNum: true,
          accountBalance: true,
        },
      },
    },
  });

  if (!soldier) {
    throw new Error(`${userId}번 유저의 군 복무 정보가 없습니다`);
  }

  const account = soldier.Account?.[0];
  if (!account) {
    throw new Error(`${userId}번 유저의 계좌 정보가 없습니다`);
  }

  return {
    accountNum: account.accountNum,
    accountBalance: account.accountBalance,
  };
};
