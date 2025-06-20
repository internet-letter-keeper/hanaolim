import { ICONS } from "@/constants/icons";

/**
 * 아이콘 이름을 ID로 매핑하는 함수
 * 기본값: 5
 * @param iconName 아이콘 이름
 * @returns 아이콘 아이디
 */
export const getIconIdByName = (iconName: string): number => {
  const icon = ICONS.find((icon) => icon.name === iconName);
  return icon ? icon.id : 5;
};

/**
 * 아이콘 ID를 이름으로 매핑하는 함수
 * 기본값 face
 * @param iconId 아이콘 아이디
 * @returns 아이콘 이름
 */
export const getIconNameById = (iconId: number): string => {
  const icon = ICONS.find((icon) => icon.id === iconId);
  return icon ? icon.name : "face";
};
