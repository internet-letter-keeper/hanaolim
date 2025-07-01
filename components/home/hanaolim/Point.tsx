"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Txt from "@/components/atoms/Text";
import { Progress } from "@/components/ui/progress";
import PointRuleTooltip from "./PointRuleTooltip";

type Props = {
  letterExp: number;
};

export default function Point({ letterExp }: Props) {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/pointHistory");
  };

  const toggleTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip((prev) => !prev);
  };

  const progressPercent = ((letterExp % 10) / 10) * 100;

  return (
    <div
      onClick={handleClick}
      className="relative w-full px-[17px] py-3 rounded-[15px] bg-yellow-4d8 border border-yellow-9af flex flex-col gap-[6px] cursor-pointer"
    >
      <div className="flex items-center justify-between w-full">
        <Txt size={14} weight="medium" className="text-gray-939">
          포인트 적립까지
        </Txt>
        <div className="flex items-center gap-[13px] relative">
          <Txt size={14} weight="heavy" className="text-yellow-32b">
            {letterExp % 10}/10
          </Txt>
          <Image
            src="/images/coin.svg"
            alt="코인 아이콘"
            width={25}
            height={25}
            className="w-[25px] h-[25px]"
          />
          <Image
            src="/icons/ic-question.svg"
            alt="도움말 아이콘"
            width={15}
            height={15}
            className="w-[15px] h-[15px] cursor-pointer"
            onClick={toggleTooltip}
          />
          {showTooltip && (
            <div className="absolute top-full -left-27.5 mt-3 z-10">
              <PointRuleTooltip />
            </div>
          )}
        </div>
      </div>

      {/* 포인트 게이지 */}
      <Progress variant="yellow" value={progressPercent} />

      <div className="flex justify-between">
        <Txt size={12} weight="medium" className="text-gray-353">
          총 {Math.floor(letterExp / 10)}회 적립
        </Txt>
        <Txt
          size={12}
          weight="medium"
          className="text-gray-353 underline self-end cursor-pointer"
          onClick={handleClick}
        >
          포인트 내역보기
        </Txt>
      </div>
    </div>
  );
}
