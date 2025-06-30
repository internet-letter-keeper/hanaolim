"use server";

import prisma from "../db";

/**
 * 홈화면에 표시할 유저 이름 + 병사 날짜 정보 조회
 * @usage 홈 상단 프로필
 * @param userId number - 유저 ID
 * @returns { userName, startDate, endDate }
 * @throws userId를 가진 유저가 DB에 없을 때
 */
export const getProfileInfo = async (userId: number) => {
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
export const getAccountInfo = async (userId: number) => {
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

  const account = soldier?.Account[0];

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
export const getEarnedPoint = async (userId: number) => {
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
 * 내가 받은 전체 편지 수 + 읽지 않은 편지 수 조회
 * @param userId number - 현재 로그인한 유저 ID
 * @returns { totalCount: number, unreadCount: number }
 */
export const getLetterCount = async (userId: number) => {
  const totalCount = await prisma.letter.count({
    where: {
      receiverId: userId,
      parentLetterId: null,
    },
  });

  const unreadCount = await prisma.letter.count({
    where: {
      receiverId: userId,
      readDate: null,
      parentLetterId: null,
    },
  });

  return { totalCount, unreadCount };
};
