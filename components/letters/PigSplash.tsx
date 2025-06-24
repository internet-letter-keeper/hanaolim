"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Txt from "@/components/atoms/Text";
import { PrimaryButton } from "../atoms";

type PigSplashProps = {
  onSkip: () => void;
};

export default function PigSplash({ onSkip }: PigSplashProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  const handleGoToHistory = () => {
    router.push("/pointHistory");
  };

  if (!isVisible) return null;

  return (
    <div className="h-screen relative">
      {/* Skip 버튼 - 오른쪽 상단 고정 */}
      <div className="absolute top-3 right-3">
        <button
          onClick={handleSkip}
          className="px-[14px] py-[5px] rounded-[5px] h-[23px]"
        >
          <Txt weight="medium" size={14}>
            Skip
          </Txt>
        </button>
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="h-full flex flex-col justify-center items-center gap-8">
        <Image
          src="/video/coinpig.gif"
          alt="돼지저금통 애니메이션"
          width={200}
          height={200}
          className="w-2/5 object-contain"
        />

        <div className="text-center">
          <Txt size={22} weight="heavy" className="text-green-49d">
            1000포인트
          </Txt>
          <Txt size={22} weight="bold">
            가 적립되었습니다!
          </Txt>
        </div>

        <PrimaryButton
          title="포인트 적립 내역 보기"
          onClick={handleGoToHistory}
          rounded="sm"
          textSize={16}
          align="center"
          weight="cm"
          className="h-[38px] mt-[38px]"
        />
      </div>
    </div>
  );
}
