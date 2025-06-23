import { ICON_POSITION, ICONS } from "@/constants/icons";

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
 * 아이콘이 관물대 위에 표시되는 위치 className을 반환하는 함수
 * @param idx 관물대 각 페이지별 편지의 순서
 * @returns className
 */
export const getIconPositionByIdx = (idx: number): string => {
  const icon = ICON_POSITION.find(({ positionId }) => positionId === idx);
  return icon ? icon.iconPosition : "";
};

/**
 * 편지의 iconId로 아이콘 이미지, 대체 텍스트를 불러오는 함수
 * @param iconId
 * @returns \{ 아이콘 이미지, 대체 텍스트 }
 */
export const getIconInfoByIconId = (iconId: number) => {
  const icon = ICONS.find(({ id }) => id === iconId);
  return icon ? { src: icon.src, alt: icon.alt } : { src: "", alt: "" };
};
