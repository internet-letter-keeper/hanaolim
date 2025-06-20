"use server";

import { calculateRankByStartDate } from "@/utils/date";
import { FriendProfile, SoldierRank } from "@/types/common/profile";
import prisma from "../db";

export const getFriendsList = async (
  userId: number
): Promise<FriendProfile[]> => {
  const now = new Date();
  const cache = new Map<string, SoldierRank>();

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

  return friends.map((f) => {
    const s = f.Soldier;
    const key = s.startDate.toISOString().slice(0, 10);

    let rank = cache.get(key);

    if (!rank) {
      rank = calculateRankByStartDate(new Date(s.startDate), now);
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
