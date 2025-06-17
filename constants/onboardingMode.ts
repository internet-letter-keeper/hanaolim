import { OnboardingModeMap } from "@/types/mode";

export const ONBOARDING_MODE: OnboardingModeMap = {
  soldier: {
    title: "나를 군인으로 등록하기",
    label: "등록하기",
    imgSrc: "/images/byeoldol-face.svg",
    iconAlt: "사용자를 군인으로 등록하는 페이지로 이동하는 버튼",
    imgAlt: "가운데 별이 박혀 있는 군모를 쓴 하나은행 마스코트 별돌이",
  },
  viewer: {
    title: "보고 싶은 군인 추가하기",
    label: "추가하기",
    imgSrc: "/images/letter.svg",
    iconAlt: "보고 싶은 군인을 추가할 수 있는 페이지로 이동하는 버튼",
    imgAlt: "편지 모양 아이콘",
  },
};
