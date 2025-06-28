import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/message";
import { requireAuth } from "@/utils/auth";
import prisma from "../db";

/**
 * 포인트 적립 내역 불러오기
 * @param soldierId
 * @returns soldierId의 포인트 내역
 * @throws soldierId가 숫자가 아닐 때
 */
export const getPointHistory = async (soldierId: number) => {
  requireAuth();
  try {
    //queryRawUnsafe로 인한 SQL 인젝션 방지
    if (!Number.isInteger(soldierId)) {
      throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);
    }
    //1. 포인트 리스트 조회하면서 누적합 구하기 (최신순)
    const pointList = await prisma.$queryRawUnsafe<
      {
        pointId: number;
        point: number;
        createDate: Date;
        soldierId: number;
        balance: number;
      }[]
    >(`
  SELECT
    pointId,
    point,
    createDate,
    soldierId,
    SUM(point) OVER (PARTITION BY soldierId ORDER BY createDate ASC) AS balance
  FROM Point
  WHERE soldierId = ${soldierId}
  ORDER BY createDate DESC
`);
    return {
      success: true,
      message: SUCCESS_MESSAGES.COMMON.SUCCESS,
      data: pointList,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.POINT.FETCH_FAILED,
    };
  }
};

//TODO: 무한스크롤 안 할 시 그냥 위에서 누적합한 거로 쓰기

/**
 * 포인트 총합 불러오기
 * @param soldierId
 * @returns soldierId의 포인트 총합
 * @throws soldierId가 숫자가 아닐 때
 */
export const getPointSum = async (soldierId: number) => {
  requireAuth();
  try {
    if (!Number.isInteger(soldierId)) {
      throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);
    }
    const pointSum = await prisma.point.aggregate({
      where: { soldierId },
      _sum: { point: true },
    });

    //합계가 null이면 0으로 처리함
    const result = pointSum._sum.point ?? 0;
    return {
      success: true,
      message: SUCCESS_MESSAGES.COMMON.SUCCESS,
      data: result,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.POINT.FETCH_FAILED,
    };
  }
};
