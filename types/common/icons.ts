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
 */
export type Icon = {
  id: number;
  name: IconName;
  src: string;
};
