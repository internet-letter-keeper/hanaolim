"use server";

import { calculateRankByStartDate } from "@/utils/date";
import { FriendProfile, SoldierRank } from "@/types/common/profile";
import prisma from "../db";
import { isUserExists } from "./auth-actions";

/**
 * 친구 목록 불러오기
 * @usage 관물대, 친구 관리
 * @param userId
 * @returns userId의 친구 목록
 * @throws userId가 숫자 형식이 아닐 때
 * @throws userId를 가진 유저가 DB에 없을 때
 */
export const getFriendsList = async (
  userId: number
): Promise<FriendProfile[]> => {
  // userId가 숫자 형식인지 확인
  if (typeof userId !== "number" || Number.isNaN(userId)) {
    throw new Error("userId는 숫자여야 합니다");
  }

  // DB에 있는 유저인지 확인
  const res = await isUserExists(userId);

  if (!res) throw new Error(`${userId}번 id를 가진 유저가 존재하지 않습니다`);

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
  });

  // 계급 계산 결과 캐싱
  const cache = new Map<string, SoldierRank>();

  return friends.map((f) => {
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
    };
  });
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
    throw new Error("계좌번호를 불러오지 못했습니다. 다시 시도해주세요.");

  return res.Account[0].accountNum;
};

/**
 * 군인의 user테이블 정보 조회
 * @param soldierId
 * @returns Soldier 테이블과 User테이블의 userName, isSoldier, isSocial
 */
export const getUserBySoldierId = async (soldierId: number) =>
  prisma.soldier.findUnique({
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
