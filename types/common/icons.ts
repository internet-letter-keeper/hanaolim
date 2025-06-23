export type IconName =
  | "bag"
  | "shoes"
  | "dogtag"
  | "vest"
  | "face"
  | "helmet"
  | "gun";

/**
 * id: icon 의 아이디
 * name: icon 의 이름
 * src: icon의 경로
 * alt: icon 대체 텍스트
 * className: 관물대에서의 newIcon의 위치
 */
export type Icon = {
  id: number;
  name: IconName;
  src: string;
  alt: string;
};

export type IconPosition = {
  positionId: number;
  iconPosition: string;
};
