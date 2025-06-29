"use server";

import { ERROR_MESSAGES } from "@/constants/message";
import prisma from "../db";
import { Prisma } from "../generated/prisma";

type PointEarnProps = {
  letterId: number;
  soldierId: number;
  senderId: number;
  receiverId: number;
};

/**
 * 포인트 적립을 다루는 트랜잭션
 * @param letterId
 * @param soldierId
 * @throws letterId를 가진 편지가 DB에 존재하지 않을 때
 * point가 1이상일 경우(얻은 포인트가 있음), pointPop 애니메이션 발생
 */
export const handleEarnPoint = async ({
  letterId,
  soldierId,
  senderId,
  receiverId,
}: PointEarnProps) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      //1. 편지 읽은 날짜 업데이트
      const readResult = await postReadDate(letterId, tx);

      //1-1. 이미 읽었던 편지인 경우
      if (!readResult.updated) {
        return {
          point: 0,
        };
      }

      //2. 적립 가능 여부 확인
      const earnableResult = await getPointEarnability(
        senderId,
        receiverId,
        tx
      );

      //2-1. 포인트 적립 조건 불충족
      if (!earnableResult.earnability) {
        return {
          point: 0,
        };
      }

      //3. 적립 액션
      const earnResult = await postEarnedPoint(soldierId, tx);

      //3-1. 경험치가 덜 차서 포인트 적립 불가
      if (earnResult.point === 0) {
        return {
          point: 0,
        };
      }

      //3-2. 경험치 다 차서 적립까지 성공 후, success true와 적립된 포인트 반환하기
      return {
        point: earnResult.point,
      };
    });
    return result;
  } catch {
    return {
      point: 0,
    };
  }
};

/**
 * readDate가 null인 Letter를 현재 시간으로 업데이트
 * @param letterId 편지 ID
 * @returns 업데이트 성공 시 succss, 업데이트 실행시 success
 * @throws 유효하지 않은 letterId 형식 또는 DB 처리 중 에러 발생
 */
const postReadDate = async (letterId: number, tx: Prisma.TransactionClient) => {
  if (typeof letterId !== "number" || Number.isNaN(letterId)) {
    throw new Error(ERROR_MESSAGES.LETTER.ID_IS_NUMBER);
  }

  const res = await tx.letter.updateMany({
    where: {
      letterId,
      readDate: null,
    },
    data: { readDate: new Date() },
  });

  //1. updateMany 성공적 실행, 안 읽은 편지라면 updated true 이미 읽었다면 false
  return {
    updated: res.count > 0,
  };
};

/**
 * 안 읽은 편지라면 포인트 적립 조건 검사하기
 * @param letterId 편지 ID
 * @param senderId 편지 보낸 사람 ID
 * @param receiverId 편지 받은 사람 ID
 * @returns 함수 실행 성공 여부와 포인트 적립 가능 여부
 * @throws 함수 실행 실패 시 false
 */
const getPointEarnability = async (
  senderId: number,
  receiverId: number,
  tx: Prisma.TransactionClient
) => {
  //오늘 날짜의 시작 EX)2025-06-21 00시 00분 00초
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  //내일 날짜의 시작 (오늘 날짜에서 DAY만 + 1)
  const tommorrowStart = new Date(todayStart);
  tommorrowStart.setDate(tommorrowStart.getDate() + 1);

  const res = await tx.letter.findMany({
    where: {
      senderId,
      receiverId,
      readDate: {
        gte: todayStart,
        lt: tommorrowStart,
      },
    },
  });

  //1.'오늘' 해당 '군인'이 '해당 유저'한테 받은 편지가 '1개'
  if (res.length === 1) {
    return {
      earnability: true,
    };
  }
  //2. '오늘' 해당 '군인'이 '해당 유저'한테 받은 편지가 '1개'가 아님
  return {
    earnability: false,
  };
};

/**
 * 포인트 적립 조건을 만족했을 때 경험치를 업데이트하고 포인트를 적립해 줌
 * @param soldierId
 * @returns 경험치 적립 성공 여부와 적립한 포인트
 * @throws 경험치 적립 실패 또는 포인트 적립 실패
 */
const postEarnedPoint = async (
  soldierId: number,
  tx: Prisma.TransactionClient
) => {
  //1. 경험치 적립 실행
  const updatedExp = await tx.soldier.update({
    where: { soldierId },
    data: {
      letterExp: {
        increment: 1,
      },
    },
  });

  //2. 경험치가 10으로 나누어지는 경우 포인트 적립
  const { letterExp } = updatedExp;

  const getRandomPoint = () => Math.floor(Math.random() * 1000) + 1;

  //2-1. 나누어 떨어지니까 난수 발생해서 포인트 적립 (안 나누어 떨어지면 0)
  if (letterExp % 10 !== 0) {
    return { point: 0 };
  }

  const randomPoint = getRandomPoint();

  const createdPoint = await tx.point.create({
    data: {
      point: randomPoint,
      soldierId,
    },
  });

  return { point: createdPoint.point };
};
