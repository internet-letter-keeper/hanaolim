"use server";

import bcrypt from "bcryptjs";
import { SoldierData, UserData } from "@/types/common/auth";
import prisma from "../db";

/**
 * 로그인을 위한 유저 정보 불러오기
 * @param email 유저 이메일
 * @returns
 */
export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      Soldier: true,
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

// 군인으로 등록하기
/**
 *
 * @param soldier 군인 정보
 * @param soldier.userId 유저 ID
 * @param soldier.startDate 군인 시작일
 * @param soldier.endDate 군인 종료일
 * @param soldier.accountNumber 군인 계좌번호
 * @returns
 */
export const postSoldier = async (soldier: SoldierData) => {
  try {
    let genCode = await generateShortCode(8); // 8자리 코드 생성
    const postSoldier = await prisma.soldier.create({
      data: {
        userId: soldier.userId,
        startDate: soldier.startDate,
        endDate: soldier.endDate,
        code: genCode || "", // 코드가 없을 경우 빈 문자열로 설정
      },
      select: {
        soldierId: true,
        startDate: true,
        endDate: true,
        letterExp: true,
        statusMessage: true,
      },
    });

    const postAccount = await prisma.account.create({
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
    console.error("군인 등록 실패:", error);
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
 * 이메일 중복 확인 함수
 * @param email 확인할 이메일 주소
 * @returns 이메일이 중복되었는지 여부
 */
export const isEmailDuplicated = async (email: string): Promise<boolean> => {
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
    generateShortCode(length); // 재귀 호출로 중복 코드 생성
  } else {
    return result; // 중복되지 않는 코드 반환
  }
};
