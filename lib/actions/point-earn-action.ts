import prisma from "../db";

//1.NOTE: 편지 읽었을 때 첫 번째로 수행할 로직, 날짜 업데이트

/**
 * readDate가 null인 Letter를 현재 시간으로 업데이트
 * @param letterId 편지 ID
 * @returns 업데이트 성공하면 success: true
 * @throws 실패 시 false
 */
export const postReadDate = async (letterId: number) => {
  try {
    const updatedDate = await prisma.letter.updateMany({
      where: {
        letterId: letterId,
        readDate: null,
      },
      data: { readDate: new Date() },
    });

    return {
      success: true,
      updated: updatedDate.count > 0, //0 이상이면 업데이트 됐으니 포인트 적립 수행
    };
  } catch (error) {
    return {
      success: false,
      update: false,
    };
  }
};

//2. NOTE: 1번에서 날짜가 업데이트 됐으면 적립 가능 여부 확인하기

//2. NOTE: 2번까지 수행됐으면 포인트 적립 실행 (RANDOM)
