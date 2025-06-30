import { SoldierRank } from "@/types/common/profile";

/**
 * 전역일까지 남은 일 수 계산
 * @param endDate 전역일
 * @returns number - 전역일까지 남은 일 수
 */
export const untilEndDate = (endDate: Date) =>
  endDate
    ? Math.floor(
        (new Date().getTime() - new Date(endDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

/**
 * 전역일 D-day 계산
 * @param endDate 전역일
 * @returns string - D-day형식
 */
export const dDayConCatString = (endDate: Date) => {
  const untilEnd = untilEndDate(endDate);

  return untilEnd < 0 ? `D${untilEnd}` : `D+${untilEnd}`;
};

/**
 * 입대일 기준으로 계급 계산
 * @param startDate 입대일
 * @returns SoldierRank - "이병" | "일병" | "상병" | "병장";
 */
export function calculateRankByStartDate(startDate: Date): SoldierRank {
  const startDay = startDate.getDate();
  const currentDate = new Date();

  // 첫 진급 기준: 1일이면 2개월 후, 아니면 3개월 후
  const firstPromotionDate = new Date(startDate);

  firstPromotionDate.setMonth(
    firstPromotionDate.getMonth() + (startDay === 1 ? 2 : 3)
  );

  const secondPromotionDate = new Date(firstPromotionDate);

  secondPromotionDate.setMonth(secondPromotionDate.getMonth() + 6);

  const thirdPromotionDate = new Date(secondPromotionDate);

  thirdPromotionDate.setMonth(thirdPromotionDate.getMonth() + 6);

  if (currentDate < firstPromotionDate) return "이병";
  if (currentDate < secondPromotionDate) return "일병";
  if (currentDate < thirdPromotionDate) return "상병";
  return "병장";
}

export const toKoreaTime = (date: Date) => {
  const minusNine = -9 * 60 * 60 * 1000; // 9시간을 밀어줌
  return new Date(date.getTime() - minusNine);
};

export const isNotSoldierYet = (startDate: Date) =>
  new Date(startDate) > new Date();
