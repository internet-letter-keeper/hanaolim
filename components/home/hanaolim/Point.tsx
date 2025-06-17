"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PointAccrue } from "@/types/point";
import Txt from "@/components/atoms/Text";
import { Progress } from "@/components/ui/progress";
import PointRuleTooltip from "./PointRuleTooltip";

type Props = {
  pointAccrue: PointAccrue;
};

export default function Point({ pointAccrue }: Props) {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    router.push("/pointHistory");
  };

  const toggleTooltip = () => setShowTooltip((prev) => !prev);

  return (
    <div className="relative w-full px-[17px] py-3 rounded-[15px] bg-yellow-4d8 border border-yellow-9af flex flex-col gap-[6px]">
      <div className="flex items-center justify-between w-full">
        <Txt size={14} weight="medium" className="text-gray-939">
          포인트 적립까지
        </Txt>
        <div className="flex items-center gap-[13px] relative">
          <Txt size={14} weight="heavy" className="text-yellow-32b">
            {pointAccrue.myStamp}/{pointAccrue.totalStamp}
          </Txt>
          <Image
            src="/images/ic-coin.svg"
            alt="코인 아이콘"
            width={25}
            height={25}
          />
          <Image
            src="/images/ic-question.svg"
            alt="도움말 아이콘"
            width={15}
            height={15}
            className="cursor-pointer"
            onClick={toggleTooltip}
          />
          {showTooltip && (
            <div className="absolute top-full right-0 mt-3 z-10">
              <PointRuleTooltip />
            </div>
          )}
        </div>
      </div>

      <Progress variant="yellow" />

      <Txt
        size={12}
        weight="medium"
        className="text-gray-353 underline self-end cursor-pointer"
        onClick={handleClick}
      >
        포인트 내역보기
      </Txt>
    </div>
  );
}
