export type OnboardingModeKey = "soldier" | "viewer";

export type OnboardingModeType = {
  title: string;
  label: string;
  imgSrc: string;
  iconAlt: string;
  imgAlt: string;
};

export type OnboardingModeMap = Record<OnboardingModeKey, OnboardingModeType>;
