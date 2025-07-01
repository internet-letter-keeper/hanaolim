"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type MouseEvent } from "react";
import { PrimaryButton, Txt } from "../atoms";

type PigSplashProps = {
  onSkip: () => void;
  point: number;
};

export default function PigSplash({ onSkip, point }: PigSplashProps) {
  const router = useRouter();

  const handleGoToHistory = (e: MouseEvent) => {
    e.stopPropagation();
    router.push("/pointHistory");
  };

  return (
    <div
      className="fixed inset-0 z-[1000] -translate-x-1/2 left-1/2 w-full sm:w-sm bg-[#333333]/90"
      onClick={onSkip}
    >
      {/*모달 종료 버튼 */}
      <button className="absolute top-6 right-3">
        <Txt weight="medium" size={18} className="text-white p-4">
          Skip
        </Txt>
      </button>

      {/* 중앙 콘텐츠 */}
      <div className="h-full flex flex-col justify-center items-center gap-8">
        <Image
          src="/video/coinpig.gif"
          alt="돼지저금통 애니메이션"
          width={300}
          height={300}
          className="w-2/5 object-contain"
          unoptimized
        />

        <div className="text-center">
          <Txt size={30} weight="heavy" className="text-green-49d">
            {point} P <br />
          </Txt>
          <Txt size={22} weight="bold" className="text-white">
            적립되었습니다!
          </Txt>
        </div>

        <PrimaryButton
          title="포인트 적립 내역 보기"
          onClick={handleGoToHistory}
          className="px-5 w-fit"
        />
      </div>
    </div>
  );
}
