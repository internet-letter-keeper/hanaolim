"use server";

import db from "@/lib/db";

export const getSoldierInfo = async (soldierId: string) => {
  try {
    const soldier = await db.soldier.findUnique({
      where: {
        soldierId: parseInt(soldierId),
      },
      include: {
        User: {
          select: {
            userName: true,
            isSoldier: true,
          },
        },
      },
    });

    if (!soldier) {
      return { success: false, error: "군인 정보를 찾을 수 없습니다." };
    }

    return {
      success: true,
      data: {
        soldierId: soldier.soldierId,
        userName: soldier.User.userName,
        isSoldier: soldier.User.isSoldier,
        startDate: soldier.startDate,
        endDate: soldier.endDate,
        statusMessage: soldier.statusMessage,
        letterExp: soldier.letterExp,
      },
    };
  } catch (error) {
    console.error("Error fetching soldier info:", error);
    return {
      success: false,
      error: "군인 정보를 가져오는 중 오류가 발생했습니다.",
    };
  }
};
