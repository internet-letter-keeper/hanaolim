export type UserData = {
  email: string;
  userName: string;
  password?: string;
  isSocial?: boolean;
};

export type SoldierData = {
  userId: number;
  startDate: Date;
  endDate: Date;
  accountNumber: string;
  code?: string;
};
