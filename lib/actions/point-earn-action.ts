import prisma from "../db";
import { Letter } from "../generated/prisma";

type PointEarnProps = {
  letterId: number;
  soldierId: number;
};

/**
 * 포인트 적립을 다루는 함수
 * @param letterId
 * @param soldierId
 */
export const handleEarnPoint = async ({
  letterId,
  soldierId,
}: PointEarnProps) => {
  //letterId 편지 존재 여부 확인
  const letter = await prisma.letter.findUnique({ where: { letterId } });
  if (!letter)
    throw new Error(`letterId: ${letterId} 편지가 존재하지 않습니다`);

  //1. 편지 읽은 날짜 업데이트
  const readResult = await postReadDate(letterId);
  if (!readResult.success || !readResult.updated) {
    return {
      success: false,
      message: "이미 읽은 편지거나 업데이트가 실패했습니다",
    };
  }

  //2. 적립 가능 여부 확인
  const earnableResult = await getPointEarnability(letter);
  if (!earnableResult.success || !earnableResult.earnability)
    return {
      success: false,
      reason: "포인트 적립 조건 불충족",
    };
  //3. 적립 액션
  const earnResult = await postEarnedPoint(soldierId);
  if (!earnResult.succes) {
    return {
      success: false,
      reason: "포인트 적립 실패",
    };
  }
  //최종 적립 성공 후
  return {
    success: true,
    bonus: earnResult.bonus,
  };
};

/**
 * readDate가 null인 Letter를 현재 시간으로 업데이트
 * @param letterId 편지 ID
 * @returns 업데이트 성공 시 succss, 업데이트 실행시 success
 * @throws 유효하지 않은 letterId 형식 또는 DB 처리 중 에러 발생
 */
const postReadDate = async (letterId: number) => {
  //letterId 형식 확인하기
  if (typeof letterId !== "number" || Number.isNaN(letterId)) {
    throw new Error("letterId는 숫자여야 합니다");
  }

  try {
    const res = await prisma.letter.updateMany({
      where: {
        letterId: letterId,
        readDate: null,
      },
      data: { readDate: new Date() },
    });

    return {
      success: true,
      updated: res.count > 0, //0 이상이면 업데이트 됐으니 포인트 적립 수행
    };
  } catch (error) {
    return {
      success: false,
      updated: false,
    };
  }
};

/**
 * 안 읽은 편지라면 포인트 적립 조건 검사하기
 * @param letterId 편지 ID
 * @param senderId 편지 보낸 사람 ID
 * @param receiverId 편지 받은 사람 ID
 * @returns 함수 실행 성공 여부와 포인트 적립 가능 여부
 * @throws 함수 실행 실패 시 false
 */
const getPointEarnability = async ({
  letterId,
  senderId,
  receiverId,
}: Letter) => {
  //오늘 날짜의 시작 EX)2025-06-21 00시 00분 00초
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  //내일 날짜의 시작 (오늘 날짜에서 DAY만 + 1)
  const tommorrowStart = new Date(todayStart);
  tommorrowStart.setDate(tommorrowStart.getDate() + 1);

  try {
    const res = await prisma.letter.findMany({
      where: {
        letterId,
        senderId,
        receiverId,
        readDate: {
          gte: todayStart,
          lt: tommorrowStart,
        },
      },
    });

    //오늘 해당 군인이 해당 유저한테 받은 편지가 1개임 (지금 읽고 있는 것!) -> 적립 액션 시작
    if (res.length === 1) {
      return {
        success: true,
        earnability: true,
      };
    }
    return {
      success: true,
      earnability: false,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

/**
 * 포인트 적립 조건을 만족했을 때 경험치를 업데이트하고 포인트를 적립해 줌
 * @param soldierId
 * @returns 경험치 적립 성공 여부와 적립한 포인트
 * @throws 경험치 적립 실패 또는 포인트 적립 실패
 */
const postEarnedPoint = async (soldierId: number) => {
  try {
    //3-1. 경험치 적립 실행
    const res = await prisma.soldier.update({
      where: { soldierId },
      data: {
        letterExp: {
          increment: 1,
        },
      },
    });

    //3-2. 경험치가 10으로 나누어지는 경우 포인트 적립
    const newExp = res.letterExp;

    //TODO: 100의 배수만 (100~1000) 뭐로 하는 게 좋지...?
    const getRandomPoint = () => (Math.floor(Math.random() * 10) + 1) * 100;
    const bonus = getRandomPoint();

    if (newExp % 10 === 0) {
      await prisma.point.create({
        data: {
          point: bonus,
          createDate: new Date(),
          soldierId,
        },
      });
    }

    return {
      succes: true,
      bonus,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
