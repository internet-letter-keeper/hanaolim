import { Icon, IconPosition } from "@/types/common/icons";

export const ICONS: Icon[] = [
  {
    id: 1,
    name: "bag",
    src: "/images/cabinet-bag.svg",
    alt: "가방 이미지",
  },
  {
    id: 2,
    name: "shoes",
    src: "/images/cabinet-shoes.svg",
    alt: "군화 이미지",
  },
  {
    id: 3,
    name: "face",
    src: "/images/cabinet-byeoldol-face-blackhat.svg",
    alt: "군모를 쓴 별돌이 얼굴 이미지",
  },
  {
    id: 4,
    name: "vest",
    src: "/images/cabinet-vest.svg",
    alt: "조끼 이미지",
  },
  {
    id: 5,
    name: "dogtag",
    src: "/images/cabinet-keyring.svg",
    alt: "군번줄 이미지",
  },
  {
    id: 6,
    name: "helmet",
    src: "/images/cabinet-helmet.svg",
    alt: "군모 이미지",
  },
  {
    id: 7,
    name: "gun",
    src: "/images/cabinet-gun.svg",
    alt: "총 이미지",
  },
];

const commonIconPosition = "absolute w-[20%] h-[12%] ";

export const ICON_POSITION: IconPosition[] = [
  {
    positionId: 0,
    iconPosition: commonIconPosition + "top-[25%] left-[18%]",
  },
  {
    positionId: 1,
    iconPosition: commonIconPosition + "top-[7%] left-[52%]",
  },
  {
    positionId: 2,
    iconPosition: commonIconPosition + "top-[59%] left-[48%]",
  },
  {
    positionId: 3,
    iconPosition: commonIconPosition + "top-[74%] left-[16%]",
  },
  {
    positionId: 4,
    iconPosition: commonIconPosition + "top-[7%] left-[16%]",
  },
  {
    positionId: 5,
    iconPosition: commonIconPosition + "top-[50%] left-[22%]",
  },
  {
    positionId: 6,
    iconPosition: commonIconPosition + "top-[7%] left-[33%]",
  },
];
