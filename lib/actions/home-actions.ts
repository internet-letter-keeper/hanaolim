"use server";

import { ERROR_MESSAGES } from "@/constants/message";
import prisma from "../db";

/**
 * 군인의 계좌 정보 조회
 * @usage 카드 계좌 컴포넌트
 * @param soldierId number - 군인 ID
 * @returns accountNum, accountBalance
 * @throws soldierId에 해당하는 군 복무 정보 또는 계좌 정보가 없을 경우
 */
export const getAccountInfo = async (soldierId: number) => {
  const res = await prisma.account.findFirst({
    where: { soldierId },
    select: {
      accountNum: true,
      accountBalance: true,
    },
  });

  if (!res)
    return { success: false, message: ERROR_MESSAGES.SOLDIER.INVALID_ACCOUNT };

  return { success: true, data: { ...res } };
};

/**
 * 군인의 적금 정보 조회
 * @usage 적금 컴포넌트
 * @param soldierId number - 군인 ID
 * @returns savingsBalance
 * @throws soldierId에 해당하는 군 복무 정보 또는 적금 정보가 없을 경우
 */
export const getSavingsInfo = async (soldierId: number) => {
  const res = await prisma.account.findFirst({
    where: { soldierId },
    select: {
      savingsBalance: true,
    },
  });

  if (!res)
    return { success: false, message: ERROR_MESSAGES.SOLDIER.INVALID_ACCOUNT };

  return { success: true, data: { ...res } };
};

/**
 * 군인의 현재까지 획득한 포인트(letterExp) 조회
 * @usage 포인트 컴포넌트
 * @param soldierId number - 군인 ID
 * @returns letterExp: number
 * @throws 군인의 군 복무 정보가 없을 경우
 */
export const getEarnedPoint = async (soldierId: number) => {
  const res = await prisma.soldier.findUnique({
    where: { soldierId },
    select: {
      letterExp: true,
    },
  });

  if (!res)
    return { success: false, message: ERROR_MESSAGES.SOLDIER.NOT_FOUND };

  return { success: true, data: { ...res } };
};

/**
 * 내가 받은 전체 편지 수 + 읽지 않은 편지 수 조회
 * @param userId number - 현재 로그인한 유저 ID
 * @returns totalCount: number, unreadCount: number
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

  return { success: true, data: { totalCount, unreadCount } };
};
