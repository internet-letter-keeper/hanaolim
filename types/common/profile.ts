/**
 * 친구 프로필 원형 아이콘
 * level: 1-이병, 2-일병, 3-상병, 4-병장
 */
export type FriendProfile = {
  id: number;
  userName: string;
  endDate: Date;
  code: string;
  level: 1 | 2 | 3 | 4;
};
