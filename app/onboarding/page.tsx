import Image from "next/image";
import OnboardingCard from "@/components/OnboardingCard";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 px-6 pb-20">
      <Image
        src="/icons/ic-hanaolim.svg"
        alt="군장병을 위한 서비스 하나올림의 로고"
        width={122}
        height={40}
      />

      <div className="h-14" />

      <OnboardingCard mode="soldier" />
      <OnboardingCard mode="viewer" />
    </div>
  );
}
