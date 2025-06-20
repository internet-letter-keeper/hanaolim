"use server";

import bcrypt from "bcryptjs";
import prisma from "../db";

type UserData = {
  email: string;
  userName: string;
  password: string;
};

type SoldierData = {
  userId: number;
  startDate: Date;
  endDate: Date;
  accountNumber: string;
};

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Soldier: true,
    },
  });

export const postSignUp = async (user: UserData) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        userName: user.userName,
        isSoldier: false, // 기본값 false로 설정
        isSocial: false, // 기본값 false로 설정
      },
      select: {
        userId: true,
        email: true,
        userName: true,
        isSoldier: true,
        isSocial: true,
      },
    });

    return { ok: true, data: newUser };
  } catch (error) {
    console.error("회원가입 실패:", error);
    return { ok: false, error: "회원가입에 실패했습니다." };
  }
};

export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  return existingUser !== null;
};

export const postSoldier = async (soldier: SoldierData) => {
  try {
    const postSoldier = await prisma.soldier.create({
      data: {
        userId: soldier.userId,
        startDate: soldier.startDate,
        endDate: soldier.endDate,
      },
      select: {
        soldierId: true,
        startDate: true,
        endDate: true,
      },
    });

    const postAccout = await prisma.account.create({
      data: {
        soldierId: postSoldier.soldierId,
        accountBalance: 0,
        savingsBalance: 0,
        accountNum: soldier.accountNumber,
      },
    });

    const updateUser = await prisma.user.update({
      where: { userId: soldier.userId },
      data: { isSoldier: true },
    });

    return { ok: true, data: postSoldier };
  } catch (error) {
    return { ok: false, error: "군인등록에 실패했습니다." };
  }
};

/**
 * DB에 있는 유저인지 확인
 * @param userId
 * @returns userId의 유저 정보
 */
export const isUserExists = async (userId: number) =>
  prisma.user.findUnique({ where: { userId } });
