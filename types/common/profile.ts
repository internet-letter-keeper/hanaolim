export type SoldierRank = "이병" | "일병" | "상병" | "병장";

export type SoldierRankToNum = 1 | 2 | 3 | 4;

export type SoldierProfile = {
  soldierId: number;
  userName: string;
  endDate: Date;
  rank: SoldierRank;
};

export type SoldierUserInfo = {
  User: {
    userName: string;
    isSoldier: boolean;
    isSocial: boolean;
  };
} & {
  soldierId: number;
  startDate: Date;
  endDate: Date;
  statusMessage: string | null;
  letterExp: number;
  userId: number;
};
