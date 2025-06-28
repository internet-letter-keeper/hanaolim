"use server";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants/message";
import { FriendProfile, SoldierRank } from "@/types/common/profile";
import { requireAuth } from "@/utils/auth";
import { calculateRankByStartDate } from "@/utils/date";
import prisma from "../db";
import { isUserExists } from "./auth-actions";

/**
 * 코드로 친구 추가
 * @param code
 * @param userId
 * @returns success 여부
 * @returns 유효한 코드가 아닐 때 "코드를 다시 확인해주세요"
 * @returns 이미 친구일 때 "이미 친구입니다"
 */
export const postFriend = async (code: string, userId: number) => {
  try {
    // code와 매칭되는 군인이 있는지 확인
    const soldierId =
      (
        await prisma.soldier.findUnique({
          where: { code },
          select: { soldierId: true },
        })
      )?.soldierId ?? null;

    if (!soldierId) {
      return { success: false, message: "코드를 다시 확인해주세요" };
    }

    // 이미 친구인지 확인
    const exists = await prisma.follow.findFirst({
      where: { soldierId, userId },
    });

    if (exists) {
      return { success: false, message: "이미 친구입니다" };
    }

    const follow = await prisma.follow.create({
      data: { soldierId, userId },
      select: { followId: true, userId: true, soldierId: true },
    });

    return {
      success: true,
      message: "친구가 추가되었습니다",
      follow: follow,
    };
  } catch {
    return {
      success: false,
      message: "친구 추가에 실패했습니다. 다시 시도해주세요.",
    };
  }
};

/**
 * 친구 목록 불러오기
 * @usage 관물대, 친구 관리
 * @param userId
 * @returns userId의 친구 목록
 * @throws userId가 숫자 형식이 아닐 때
 * @throws userId를 가진 유저가 DB에 없을 때
 */

export const getFriendsList = async (userId: number) => {
  try {
    // userId가 숫자 형식인지 확인
    if (typeof userId !== "number" || Number.isNaN(userId)) {
      return { success: false, message: ERROR_MESSAGES.DATA.USER_ID_NUMBER };
    }

    // DB에 있는 유저인지 확인
    const res = await isUserExists(userId);

    if (!res) {
      return {
        success: false,
        message: `${userId}번 id를 가진 유저가 존재하지 않습니다`,
      };
    }

    const friends = await prisma.follow.findMany({
      where: { userId },
      select: {
        followId: true,
        Soldier: {
          select: {
            soldierId: true,
            endDate: true,
            startDate: true,
            User: { select: { userName: true } },
          },
        },
      },
      orderBy: { followId: "desc" },
    });

    // 계급 계산 결과 캐싱
    const cache = new Map<string, SoldierRank>();

    const friendsData = friends.map((f) => {
      const s = f.Soldier;
      const key = s.startDate.toISOString().slice(0, 10);

      let rank = cache.get(key);

      if (!rank) {
        rank = calculateRankByStartDate(new Date(s.startDate));
        cache.set(key, rank);
      }

      return {
        followId: f.followId,
        soldierId: s.soldierId,
        endDate: s.endDate,
        startDate: s.startDate,
        userName: s.User.userName,
        rank,
      } as FriendProfile;
    });

    return {
      success: true,
      message: SUCCESS_MESSAGES.COMMON.SUCCESS,
      data: friendsData,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.DATA.FETCH_FAILED,
    };
  }
};

/**
 * 군인의 계좌번호 조회
 * @param soldierId
 * @returns 계좌번호
 * @throws soldierId에 해당하는 계좌번호를 찾을 수 없을 때
 */
export const getAccountNumBySoldierId = async (soldierId: number) => {
  const res = await prisma.soldier.findUnique({
    where: { soldierId },
    select: { Account: { select: { accountNum: true } } },
  });

  if (!res)
    return { success: false, message: ERROR_MESSAGES.SOLDIER.INVALID_ACCOUNT };

  return { success: true, accountNum: res.Account[0].accountNum };
};

/**
 * 군인의 user테이블 정보 조회
 * @param soldierId
 * @returns Soldier 테이블과 User테이블의 userName, isSoldier, isSocial
 */
export const getUserBySoldierId = async (soldierId: number) => {
  try {
    const soldierInfo = await prisma.soldier.findUnique({
      where: { soldierId },
      include: {
        User: {
          select: {
            userName: true,
            isSoldier: true,
            isSocial: true,
          },
        },
      },
    });
    if (!soldierInfo) {
      return {
        success: false,
        message: ERROR_MESSAGES.SOLDIER.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: SUCCESS_MESSAGES.COMMON.SUCCESS,
      data: soldierInfo,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.DATA.FETCH_FAILED,
    };
  }
};

/**
 * 상태 메시지 변경
 * @param soldierId
 * @param statusMessage
 * @returns Soldier
 */
export const patchStatusMessage = async (
  soldierId: number,
  statusMessage: string
) => {
  await requireAuth();
  try {
    await prisma.soldier.update({
      where: { soldierId },
      data: { statusMessage },
    });
    return { success: true, message: SUCCESS_MESSAGES.COMMON.SUCCESS };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.COMMON.UPDATE_FAILED,
    };
  }
};

/**
 * 나의 첫번쨰 팔로우 목록을 보여줌
 * @param userId
 * @returns 첫번째 follow
 */
export const getFirstFollow = async (userId: number) => {
  const follow = await prisma.follow.findFirst({
    where: { userId },
    select: { followId: true, userId: true, soldierId: true },
  });

  return follow === null ? null : follow;
};

/**
 * 코드로 친구 추가
 * @param code
 * @param userId
 * @returns success 여부
 * @returns 유효한 코드가 아닐 때 "코드를 다시 확인해주세요"
 * @returns 이미 친구일 때 "이미 친구입니다"
 */
export const postFriendbyId = async (soldierNum: number, userId: number) => {
  try {
    // code와 매칭되는 군인이 있는지 확인
    const soldierId =
      (
        await prisma.soldier.findUnique({
          where: { soldierId: soldierNum },
          select: { soldierId: true },
        })
      )?.soldierId ?? null;

    if (!soldierId) {
      return { success: false, message: ERROR_MESSAGES.FRIENDS.INVALID_CODE };
    }

    // 이미 친구인지 확인
    const exists = await prisma.follow.findFirst({
      where: { soldierId, userId },
    });

    if (exists) {
      return { success: false, message: ERROR_MESSAGES.FRIENDS.ALREADY_FRIEND };
    }

    const follow = await prisma.follow.create({
      data: { soldierId, userId },
      select: { followId: true, userId: true, soldierId: true },
    });

    return {
      success: true,
      message: SUCCESS_MESSAGES.FRIENDS.ADD_SUCCESS,
      follow: follow,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.FRIENDS.ADD_FAILED,
    };
  }
};

/**
 * 친구 삭제
 * @usage 친구 목록
 * @param followId
 * @returns 성공시 success: true 와 지워진 data, 실패 시 success: false
 */
export const deleteFriend = async (followId: number) => {
  await requireAuth();
  try {
    await prisma.follow.delete({ where: { followId } });
    return {
      success: true,
      message: SUCCESS_MESSAGES.FRIENDS.DELETE_SUCCESS,
    };
  } catch {
    return {
      success: false,
      message: ERROR_MESSAGES.FRIENDS.DELETE_FAILED,
    };
  }
};
