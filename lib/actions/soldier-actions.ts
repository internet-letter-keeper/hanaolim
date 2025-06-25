"use server";

import prisma from "@/lib/db";

export const getSoldierInfo = async (soldierId: string) => {
  try {
    const soldier = await prisma.soldier.findUnique({
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

/**
 * 군인아이디에 따른 이름 반환
 * @param soldierId 군인 아이디
 * @returns 군인이름
 * @throw 가져오는데 실패했을 경우
 */
export const getSoldierName = async (soldierId: number) => {
  try {
    const soldier = await prisma.soldier.findUnique({
      where: {
        soldierId: soldierId,
      },
      include: {
        User: {
          select: {
            userName: true,
          },
        },
      },
    });

    if (!soldier) {
      return { userName: "" };
    }

    return {
      userName: soldier.User.userName,
    };
  } catch (error) {
    throw new Error("정보를 가져오는데 실패했습니다");
  }
};

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
