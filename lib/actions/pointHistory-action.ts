import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/message";
import { PointItemType } from "@/types/point";
import { requireAuth } from "@/utils/auth";
import prisma from "../db";

/**
 * 포인트 적립 내역 불러오기
 * @param soldierId
 * @returns soldierId의 포인트 내역
 * @throws soldierId가 숫자가 아닐 때
 */

export const getPointHistory = async (soldierId: number) => {
  if (!Number.isInteger(soldierId)) {
    throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);
  }

  requireAuth();

  try {
    const pointList = await prisma.$queryRaw<PointItemType[]>`
  SELECT
    pointId,
    point,
    createDate,
    soldierId,
    SUM(point) OVER (PARTITION BY soldierId ORDER BY createDate ASC) AS balance
  FROM Point
  WHERE soldierId = ${soldierId}
  ORDER BY createDate DESC
`;
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
