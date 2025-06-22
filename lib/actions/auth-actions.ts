"use server";

import bcrypt from "bcryptjs";
import { SoldierData, UserData } from "@/types/common/auth";
import { generateRandomCode, requireAuth } from "@/utils/auth";
import prisma from "../db";

// 로그인을 위한 유저 정보 불러오기
export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Soldier: true,
    },
  });

// 회원가입
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

// 이메일 중복 확인 / 회원가입과 함께 진행
export const isEmailDuplicated = async (email: string): Promise<boolean> => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  return existingUser !== null;
};

// 군인으로 등록하기
export const postSoldier = async (soldier: SoldierData) => {
  try {
    const postSoldier = await prisma.soldier.create({
      data: {
        userId: soldier.userId,
        startDate: soldier.startDate,
        endDate: soldier.endDate,
        code: generateRandomCode(),
      },
      select: {
        soldierId: true,
        startDate: true,
        endDate: true,
        letterExp: true,
        statusMessage: true,
        code: true,
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

/**
 * 현재 비밀번호가 일치하는지 확인
 * @param userId
 * @param currentPassword
 * @returns 비밀번호 일치 여부
 * @throw 사용자를 찾을 수 없을 때
 * @throw 비밀번호 확인에 실패했을 경우
 */
export const verifyCurrentPassword = async (
  userId: number,
  currentPassword: string
): Promise<{ success: boolean; isValid: boolean }> => {
  requireAuth();
  try {
    const user = await prisma.user.findUnique({
      where: { userId },
      select: { password: true },
    });

    if (!user || !user.password) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    return { success: true, isValid: isPasswordValid };
  } catch (error) {
    throw new Error("현재 비밀번호 확인에 실패했습니다.");
  }
};

/**
 * 비밀번호 변경
 * @param userId
 * @param newPassword
 * @returns 변경 성공 여부
 * @throw 비밀번호 변경에 실패했을 경우
 */
export const changePassword = async (userId: number, newPassword: string) => {
  requireAuth();
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { userId },
      data: { password: hashedPassword },
    });

    return { success: true };
  } catch (error) {
    throw new Error("비밀번호 변경에 실패했습니다.");
  }
};
