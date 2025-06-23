"use server";

import prisma from "../db";

type ProfileInfo = {
  userName: string;
  startDate: string;
  endDate: string;
};

type AccountInfo = {
  accountNum: string;
  accountBalance: number;
  savingsBalance: number;
};

type LetterInfo = {
  letterExp: number;
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
 * 유저의 계좌 및 적금 정보 조회
 * @usage 카드 컴포넌트, 적금 컴포넌트
 * @param userId number - 유저 ID
 * @returns { accountNum, accountBalance, savingsBalance }
 * @throws userId에 해당하는 군 복무 정보 또는 계좌 정보가 없을 경우
 */
export const getAccountInfo = async (userId: number): Promise<AccountInfo> => {
  const soldier = await prisma.soldier.findFirst({
    where: { userId },
    select: {
      Account: {
        select: {
          accountNum: true,
          accountBalance: true,
          savingsBalance: true,
        },
      },
    },
  });

  const account = soldier?.Account?.[0];

  if (!account) {
    throw new Error(`${userId}번 유저의 계좌 정보가 없습니다`);
  }

  return {
    accountNum: account.accountNum,
    accountBalance: account.accountBalance,
    savingsBalance: account.savingsBalance,
  };
};

/**
 * 유저의 현재까지 획득한 포인트(letterExp) 조회
 * @usage 포인트 컴포넌트
 * @param userId number - 유저 ID
 * @returns { letterExp: number }
 * @throws 유저의 군 복무 정보가 없을 경우
 */
export const getEarnedPoint = async (userId: number): Promise<LetterInfo> => {
  const soldier = await prisma.soldier.findFirst({
    where: { userId },
    select: {
      letterExp: true,
    },
  });

  if (!soldier) {
    throw new Error(`${userId}번 유저의 군 복무 정보가 없습니다`);
  }

  return {
    letterExp: soldier.letterExp,
  };
};

/**
 * 내가 보낸 편지 중 읽히지 않은 편지 수 조회
 * @param userId number - 현재 로그인한 유저 ID
 * @returns { unreadCount: number }
 */
export const getLetterCount = async (userId: number) => {
  const unreadCount = await prisma.letter.count({
    where: {
      receiverId: userId,
      readDate: null,
    },
  });

  return { unreadCount };
};

/**
 * 유저 ID로 군인 정보 조회
 * @usage soldierId props 전달 또는 군인 정보 활용이 필요한 컴포넌트
 * @param userId number - 유저 ID
 * @returns soldierId
 * @throws userId에 해당하는 군 복무 정보가 없을 경우
 */
export const getSoldierInfoByUserId = async (userId: number) => {
  const soldier = await prisma.soldier.findFirst({
    where: { userId },
    include: {
      User: {
        select: {
          userName: true,
          isSoldier: true,
        },
      },
    },
  });

  if (!soldier) {
    throw new Error(`${userId}번 유저의 군 복무 정보가 없습니다`);
  }

  return {
    soldierId: soldier.soldierId,
  };
};
