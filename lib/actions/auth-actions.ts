"use server";

import bcrypt from "bcryptjs";
import { ERROR_MESSAGES } from "@/constants/message";
import { SoldierData, UserData } from "@/types/common/auth";
import { requireAuth } from "@/utils/auth";
import prisma from "../db";

/**
 * 로그인을 위한 유저 정보 불러오기
 * @param email 유저 이메일
 * @returns
 */
export const getUserByEmail = async (email: string, includeDel = false) =>
  prisma.user.findUnique({
    where: {
      email,
      delYN: includeDel ? false : undefined, // 삭제되지 않은 유저만 조회
    },
    include: {
      Soldier: true,
      Follow: true,
    },
  });

/**
 * 회원가입
 * @param user 회원가입 정보
 * @param user.email 유저 이메일
 * @param user.password 유저 비밀번호
 * @param user.userName 유저 이름
 * @returns
 */
export const postSignUp = async (user: UserData) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: user.password ? await bcrypt.hash(user.password, 10) : "",
        userName: user.userName,
        isSoldier: false, // 기본값 false로 설정
        isSocial: user.isSocial || false, // 기본값 false로 설정
      },
      select: {
        userId: true,
        email: true,
        userName: true,
        isSoldier: true,
        isSocial: true,
      },
    });

    return { success: true, data: newUser };
  } catch {
    return { success: false, message: ERROR_MESSAGES.AUTH.FAILD_TO_SIGN_UP };
  }
};
/**
 * 회원 탈퇴
 * @param userId 유저 ID
 * @returns
 */
export const deleteUser = async (userId: number) => {
  try {
    await prisma.user.update({
      where: { userId },
      data: { delYN: true },
    });
    return { success: true };
  } catch {
    return {
      success: false,
    };
  }
};

/**
 * 군인으로 등록하기
 * @param soldier 군인 정보
 * @param soldier.userId 유저 ID
 * @param soldier.startDate 군인 시작일
 * @param soldier.endDate 군인 종료일
 * @param soldier.accountNumber 군인 계좌번호
 * @returns
 */
export const postSoldier = async (soldier: SoldierData) => {
  try {
    const genCode = await generateShortCode(8); // 8자리 코드 생성
    const postSoldier = await prisma.soldier.create({
      data: {
        userId: soldier.userId,
        startDate: soldier.startDate,
        endDate: soldier.endDate,
        code: String(genCode),
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

    await prisma.account.create({
      data: {
        soldierId: postSoldier.soldierId,
        accountBalance: 0,
        savingsBalance: 0,
        accountNum: soldier.accountNumber,
      },
    });

    await prisma.user.update({
      where: { userId: soldier.userId },
      data: { isSoldier: true },
    });

    return { success: true, data: postSoldier };
  } catch {
    return { success: false, message: ERROR_MESSAGES.SOLDIER.REGISTER_FAILED };
  }
};

/**
 * 이메일 중복 확인 함수
 * @param email 확인할 이메일 주소
 * @returns 이메일이 중복되었는지 여부
 */
export const isEmailDuplicated = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  return existingUser !== null;
};

/**
 * 군인 코드 생성 함수
 * @param length 생성할 코드의 길이 (기본값: 8)
 * @returns 생성된 코드
 */
export const generateShortCode = async (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const alreadyExists = await prisma.soldier.findUnique({
    where: { code: result },
  });

  if (alreadyExists) {
    await generateShortCode(length); // 재귀 호출로 중복되지 않는 코드 생성
  } else {
    return result; // 중복되지 않는 코드 반환
  }
};

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
) => {
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
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.AUTH.WRONG_PASSWORD,
    };
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
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.AUTH.CHANGE_PASSWORD_FAILED,
    };
  }
};
