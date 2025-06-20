"use server";

import bcrypt from "bcryptjs";
import prisma from "../db";

type UserData = {
  email: string;
  userName: string;
  password: string;
};

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: {
      email,
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
