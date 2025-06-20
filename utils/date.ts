import { SoldierRank } from "@/types/common/profile";

export const untilEndDate = (endDate: Date) =>
  endDate
    ? Math.floor(
        (new Date().getTime() - new Date(endDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

export const dDayConCatString = (endDate: Date) =>
  untilEndDate(endDate) < 0
    ? `D${untilEndDate(endDate)}`
    : `D+${untilEndDate(endDate)}`;

export function calculateRankByStartDate(
  startDate: Date,
  currentDate = new Date()
): SoldierRank {
  const startDay = startDate.getDate();

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
