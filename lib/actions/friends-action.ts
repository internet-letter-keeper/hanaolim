"use server";

import prisma from "../db";

/**
 * 친구 삭제
 * @usage 친구 목록
 * @param followId
 * @returns 성공시 success:ture 와 지워진 data, 실패시 시
 */
export const deleteFriend = async (followId: number) => {
  try {
    const deletedData = await prisma.follow.delete({ where: { followId } });
    return {
      success: true,
      deletedData,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
