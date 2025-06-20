import { PointItemType } from "@/types/point";
import prisma from "../db";

//NOTE: 포인트 내역을 확인
export const getPointHistory = async (
  soldierId: number
): Promise<PointItemType[]> => {
  //queryRawUnsafe로 인한 SQL 인젝션 방지
  if (!Number.isInteger(soldierId)) {
    throw new Error("soldierId must be a number");
  }
  //1. 포인트 리스트 조회하기 (최신순)
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

  return pointList;
};

//TODO: 무한스크롤 안 할 시 그냥 위에서 누적합한 거로 쓰기
//NOTE: 포인트 총합을 확인 (무한스크롤 때문에 분리)
export const getPointSum = async (soldierId: number) => {
  const pointSum = await prisma.point.aggregate({
    where: { soldierId },
    _sum: { point: true },
  });

  //합계가 null이면 0으로 처리함
  const result = pointSum._sum.point ?? 0;

  return result;
};
