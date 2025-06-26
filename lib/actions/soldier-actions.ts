"use server";

import prisma from "@/lib/db";

/**
 * 입대일과 전역일 업데이트
 * @param soldierId
 * @param startDate
 * @param endDate
 * @throws 변경에 실패했을 때
 */
export const updateSoldierDates = async (
  soldierId: number,
  startDate: Date,
  endDate: Date
) => {
  try {
    await prisma.soldier.update({
      where: {
        soldierId: soldierId,
      },
      data: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    return {
      success: true,
    };
  } catch (error) {
    console.error("입대일/전역일 변경에 실패했습니다.", error);
    throw new Error("입대일/전역일 변경에 실패했습니다.");
  }
};
