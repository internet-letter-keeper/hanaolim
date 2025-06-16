import Image from "next/image";
import OnboardingCard from "@/components/OnboardingCard";

export default function OnboardingPage() {
  return (
    <div className="h-full flex flex-col gap-y-5 items-center justify-center ">
      <Image
        src={"/images/ic-hanaolim-logo.svg"}
        alt={"군장병을 위한 서비스 하나올림의 로고"}
        width={122}
        height={40}
      />
      <div className="h-14" />
      <OnboardingCard mode={"soldier"} />
      <OnboardingCard mode={"viewer"} />
    </div>
  );
}
