import prisma from "../db";
import { Letter } from "../generated/prisma";

//0. NOTE:포인트 적립 핸들 함수
export const handleEarnPoint = async () => {
  //1. 편지 읽은 날짜 업데이트
  //2. 적립 가능 여부 확인
  //3. 적립 액션
};

//1.NOTE: 편지 읽었을 때 첫 번째로 수행할 로직, 날짜 업데이트

/**
 * readDate가 null인 Letter를 현재 시간으로 업데이트
 * @param letterId 편지 ID
 * @returns 업데이트 성공 시 succss, 업데이트 실행시 success
 * @throws 실패 시 false
 */
export const postReadDate = async (letterId: number) => {
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

//2. NOTE: 1번에서 날짜가 업데이트 됐으면 적립 가능 여부 확인하기

/**
 * 안 읽은 편지라면 포인트 적립 조건 검사하기
 * @param letterId 편지 ID
 * @param senderId 편지 보낸 사람 ID
 * @param receiverId 편지 받은 사람 ID
 * @returns 함수 실행 성공 여부와 포인트 적립 가능 여부
 * @throws 함수 실행 실패 시 false
 */
export const getPointEarnability = async ({
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

//3. NOTE: 2번까지 수행됐으면 포인트 적립 실행
/**
 * 포인트 적립 조건을 만족했을 때 경험치를 업데이트하고 포인트를 적립해 줌
 * @param soldierId
 * @returns 경험치 적립 성공 여부와 적립한 포인트
 * @throws 경험치 적립 실패 또는 포인트 적립 실패
 */
export const postEarnedPoint = async (soldierId: number) => {
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
