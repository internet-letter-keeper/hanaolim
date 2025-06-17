import { FriendProfile } from "@/types/common/profile";

export const dummyFriends: FriendProfile[] = [
  {
    id: 1,
    userName: "별코",
    endDate: new Date("2024-12-31"),
    code: "ABC123",
    level: 3,
  },
  {
    id: 2,
    userName: "김재윤",
    endDate: new Date("2025-12-31"),
    code: "q234rawe",
    level: 1,
  },
  {
    id: 3,
    userName: "김재윤",
    endDate: new Date("2025-06-13"),
    code: "4356ytegr",
    level: 2,
  },
  {
    id: 4,
    userName: "김재윤",
    endDate: new Date("2025-06-15"),
    code: "567e4yurht",
    level: 4,
  },
  {
    id: 5,
    userName: "김재윤",
    endDate: new Date("2025-6-31"),
    code: "47568ueu",
    level: 1,
  },
  {
    id: 6,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "34wy6tr",
    level: 3,
  },
  {
    id: 7,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "w35t4er",
    level: 3,
  },
  {
    id: 8,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "4768uyt",
    level: 3,
  },
  {
    id: 9,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "2q534raewf",
    level: 3,
  },
  {
    id: 10,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "5t4esrg",
    level: 3,
  },
  {
    id: 11,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "707o89tikuyj",
    level: 3,
  },
  {
    id: 12,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "07p9o8yiu",
    level: 3,
  },
  {
    id: 13,
    userName: "김재윤",
    endDate: new Date("2024-12-31"),
    code: "234erdqw",
    level: 3,
  },
];

export function createDummyData() {
  const data = [];

  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    data.push({
      description: "하나은행 편지 이벤트",
      date,
      amount: 100,
      balance: 100 * (i + 1),
    });
  }

  return data;
}
