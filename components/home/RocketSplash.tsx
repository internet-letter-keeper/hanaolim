"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Txt from "@/components/atoms/Text";

const receivedTotalLetter = { unreadLetter: 8, totalLetter: 32 };
const pointAccrue = { myStamp: 2, totalStamp: 10 };

type RocketSplashProps = {
  onSkip: () => void;
};

export default function RocketSplash({ onSkip }: RocketSplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleSkip = () => {
    localStorage.setItem("isSplashSeen", "true");
    setIsVisible(false);
    onSkip();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gray-5f6 overflow-hidden h-screen -m-4 flex flex-col justify-between">
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
        {receivedTotalLetter.unreadLetter > 0 && (
          <div className="text-center">
            <Txt size={23} weight="bold">
              안 읽은 편지&nbsp;
              <Txt size={25} weight="bold" className="text-green-49d">
                {receivedTotalLetter.unreadLetter}장
              </Txt>
              보러 갈까요~?
            </Txt>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          className="w-1/2 mr-4 object-contain"
        >
          <source src="/Video/rocket.mp4" type="video/mp4" />
        </video>

        <div className="text-center">
          <Txt size={30} weight="bold">
            총 받은 편지&nbsp;
          </Txt>
          <Txt size={30} weight="bold" className="text-green-49d">
            {receivedTotalLetter.totalLetter}장
          </Txt>
        </div>
      </div>
      {/* 하단 편지 이미지 */}
      <Image
        src="/images/letter-dummy.svg"
        alt="편지 이미지"
        width={393}
        height={262}
      />
    </div>
  );
}
