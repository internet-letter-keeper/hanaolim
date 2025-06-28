"use server";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/message";
import prisma from "@/lib/db";
import { requireAuth } from "@/utils/auth";

/**
 * 입대일과 전역일 업데이트
 * @param soldierId
 * @param startDate
 * @param endDate
 */
export const updateSoldierDates = async (
  soldierId: number,
  startDate: Date,
  endDate: Date
) => {
  requireAuth();
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
      message: SUCCESS_MESSAGES.SOLDIER.DATE_UPDATE_SUCCESS,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.SOLDIER.DATE_UPDATE_FAILED,
    };
  }
};
