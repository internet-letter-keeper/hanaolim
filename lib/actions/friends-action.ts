"use server";

import prisma from "../db";

/**
 * 친구 삭제
 * @usage 친구 목록
 * @param followId
 * @returns 성공시 success: true 와 지워진 data, 실패 시 success: false
 */
export const deleteFriend = async (followId: number) => {
  try {
    await prisma.follow.delete({ where: { followId } });
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};
