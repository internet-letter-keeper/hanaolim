"use client";

import Image from "next/image";
import { useState } from "react";
import Txt from "@/components/atoms/Text";

type RocketSplashProps = {
  onSkip: () => void;
  totalCount: number;
  unreadLetter: number;
};

export default function RocketSplash({
  onSkip,
  totalCount,
  unreadLetter,
}: RocketSplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = () => {
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <div className="overflow-hidden h-screen -m-4 flex flex-col justify-between">
      <div className="flex justify-end m-3">
        {/* Skip 버튼 */}
        <button
          onClick={handleSkip}
          className="px-[14px] py-[5px] rounded-[5px] h-[23px]"
        >
          <Txt weight="medium" size={14}>
            Skip
          </Txt>
        </button>
      </div>
      <div className="flex flex-col items-center gap-8">
        {unreadLetter > 0 && (
          <div className="text-center">
            <Txt size={23} weight="bold">
              안 읽은 편지&nbsp;
              <Txt size={25} weight="bold" className="text-green-49d">
                {unreadLetter}장
              </Txt>
              보러 갈까요~?
            </Txt>
          </div>
        )}

        {/* 로켓 gif */}
        <Image
          src="/video/rocket.gif"
          alt="로켓 애니메이션"
          width={300}
          height={300}
          className="w-2/3 object-contain"
        />

        <div className="text-center">
          <Txt size={30} weight="bold">
            총 받은 편지&nbsp;
          </Txt>
          <Txt size={30} weight="bold" className="text-green-49d">
            {totalCount}장
          </Txt>
        </div>

        {/* 하단 편지 이미지 */}
        <Image
          src="/images/letter-dummy.svg"
          alt="편지 이미지"
          width={393}
          height={262}
        />
      </div>
    </div>
  );
}
