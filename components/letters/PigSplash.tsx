"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useRef, useState } from "react";
import Txt from "@/components/atoms/Text";
import { PrimaryButton } from "../atoms";

type PigSplashProps = {
  onSkip: () => void;
  point: number;
};

export default function PigSplash({ onSkip, point }: PigSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  const overlay = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleSplash = () => {
    setIsVisible(false);
    onSkip();
  };

  // 버튼 제외 버튼 클릭 시 스플래시 닫기
  const handleGoToHistory = () => {
    router.push("/pointHistory");
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlay}
      className="h-screen relative bg-[#333333]/90 z-[200] "
      onClick={handleSplash}
    >
      {/* 중앙 콘텐츠 */}
      <div className="h-full flex flex-col justify-center items-center gap-8">
        <Image
          src="/video/coinpig.gif"
          alt="돼지저금통 애니메이션"
          width={300}
          height={300}
          className="w-2/5 object-contain"
        />

        <div className="text-center">
          <Txt size={30} weight="heavy" className="text-green-49d">
            {point} P <br />
          </Txt>
          <Txt size={22} weight="bold" className="text-white">
            적립되었습니다!
          </Txt>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <PrimaryButton
            title="포인트 적립 내역 보기"
            onClick={handleGoToHistory}
            rounded="sm"
            textSize={16}
            align="center"
            weight="cm"
            className="p-3"
          />
        </div>
      </div>
    </div>
  );
}
