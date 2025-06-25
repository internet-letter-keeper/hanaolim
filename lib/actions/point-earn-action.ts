"uesr server";

import prisma from "../db";
import { Letter, Prisma } from "../generated/prisma";

type PointEarnProps = {
  letterId: number;
  soldierId: number;
};

//트랜잭션의 return type 세 가지로 정의함
//1.정상 실행 후 보너스 지급, 2. 정상 실행 but 보너스 지급 불가, 3. 비정상 실행으로 트랜잭션 종료
type HandleEarnPointResult =
  | {
      success: true;
      earn: true;
      bonus: number;
    }
  | {
      success: true;
      earn: false;
    }
  | {
      success: false;
      earn: false;
      message: string;
    };

/**
 * 포인트 적립을 다루는 트랜잭션
 * @param letterId
 * @param soldierId
 * @throws letterId를 가진 편지가 DB에 존재하지 않을 때
 * success가 true && earn이 true인 경우, pointPop 애니메이션 발생
 */
export const handleEarnPoint = async ({
  letterId,
  soldierId,
}: PointEarnProps): Promise<HandleEarnPointResult> => {
  console.log("트랜잭션 시작 1");
  try {
    return await prisma.$transaction(async (tx) => {
      console.log("트랜잭션 시작 2");
      const letter = await tx.letter.findUnique({ where: { letterId } });
      if (!letter)
        throw new Error(`letterId: ${letterId} 편지가 존재하지 않습니다`);

      //1. 편지 읽은 날짜 업데이트
      const readResult = await postReadDate(letterId, tx);

      //1-1. 업데이트 중 예기치 못한 오류 발생
      if (!readResult.success)
        throw new Error("편지 읽은 날짜 업데이트가 실패했습니다");
      //1-2. 이미 읽었던 편지인 경우
      if (!readResult.updated) {
        console.log("이미 읽은 편지입니다"); //디버깅용
        return {
          success: true,
          earn: false,
        };
      }

      //2. 적립 가능 여부 확인
      const earnableResult = await getPointEarnability(tx, letter);
      //2-1. 포인트 적립 조건 확인 중 예기치 못한 에러 발생
      if (!earnableResult.success)
        throw new Error("포인트 적립 조건 확인 중 에러가 발생했습니다");

      //2-2. 포인트 적립 조건 불충족
      if (!earnableResult.earnability) {
        console.log("포인트 조건 불충족입니다"); //디버깅용
        return {
          success: true,
          earn: false,
        };
      }

      console.log("포인트 적립 조건 충족입니다!!");

      //3. 적립 액션
      const earnResult = await postEarnedPoint(soldierId, tx);

      //3-1. 포인트 적립 중 예기치 못한 에러 발생
      if (!earnResult.success)
        throw new Error("포인트 적립을 실패했습니다 다시 시도해 주세요");

      //3-2. 경험치가 덜 차서 포인트 적립 불가
      if (earnResult.bonus === 0) {
        return {
          success: true,
          earn: false,
        };
      }

      //3-3. 경험치 다 차서 적립까지 성공 후, success true와 적립된 포인트 반환하기
      return {
        success: true,
        earn: true,
        bonus: earnResult.bonus,
      };
    });
  } catch (error) {
    console.error("트랜잭션 과정 중 catch", error);
    return {
      success: false,
      earn: false,
      message: (error as Error).message,
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
    throw new Error("letterId는 숫자여야 합니다");
  }

  console.log("1.postReadDate: 읽은 날짜 업데이트 함수 실행");
  try {
    const res = await tx.letter.updateMany({
      where: {
        letterId: letterId,
        readDate: null,
      },
      data: { readDate: new Date() },
    });

    //TODO: 디버깅 삭제
    if (res.count === 0) console.log("날짜 업데이트가 안 됐습니다");
    console.log("날짜가 업데이트됐습니다");

    //1. updateMany 성공적 실행, 안 읽은 편지라면 updated true 이미 읽었다면 false
    return {
      success: true,
      updated: res.count > 0,
    };
  } catch (error) {
    //2. updateMany 실패, success와 updated 모두 false return
    console.log("읽은 날짜 업데이트 중 에러 발생");
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
const getPointEarnability = async (
  tx: Prisma.TransactionClient,
  { letterId, senderId, receiverId }: Letter
) => {
  //오늘 날짜의 시작 EX)2025-06-21 00시 00분 00초
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  //내일 날짜의 시작 (오늘 날짜에서 DAY만 + 1)
  const tommorrowStart = new Date(todayStart);
  tommorrowStart.setDate(tommorrowStart.getDate() + 1);

  console.log("2.getPointEarnability: 조건 검사 함수 실행");

  try {
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

    console.log(
      "🚀 오늘 해당 군인이 해당 유저에게 받은 편지 갯수는:",
      res.length
    );

    //1.'오늘' 해당 '군인'이 '해당 유저'한테 받은 편지가 '1개'임 -> 적립 액션 시작하도록 모두 true 리턴
    if (res.length === 1) {
      return {
        success: true,
        earnability: true,
      };
    }
    //2. '오늘' 해당 '군인'이 '해당 유저'한테 받은 편지가 '1개'가 아님 -> 정상실행이나 earnability는 false로 리턴
    return {
      success: true,
      earnability: false,
    };
  } catch (error) {
    //3. 테이블 조회하다 에러가 발생함
    console.log("조건 검사 중 에러 발생");
    return {
      success: false,
      earnability: false,
    };
  }
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
  console.log("3. postEarnedPoint: 적립 경험치, 포인트 db 반영");
  try {
    console.log("3-1 경험치 적립 실행");
    //1. 경험치 적립 실행
    const res = await tx.soldier.update({
      where: { soldierId },
      data: {
        letterExp: {
          increment: 1,
        },
      },
    });
    console.log("3-2. 경험치 10으로 나누어떨어지나");
    //2. 경험치가 10으로 나누어지는 경우 포인트 적립
    const newExp = res.letterExp;
    let bonus = 0;
    const getRandomPoint = () => Math.floor(Math.random() * 1000) + 1;

    //2-1. 나누어 떨어지니까 난수 발생해서 포인트 적립 (안 나누어 떨어지면 0)
    if (newExp % 10 === 0) {
      bonus = getRandomPoint();
      await tx.point.create({
        data: {
          point: bonus,
          createDate: new Date(),
          soldierId,
        },
      });
    }
    console.log("3-2-1. 나누어 떨어지는지 검사 완료 ");

    return {
      success: true,
      bonus,
    };
  } catch (error) {
    console.log("포인트 적립 과정 중 에러 발생", error);
    return {
      success: false,
      bonus: 0,
    };
  }
};
