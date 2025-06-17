"use client";

import Image from "next/image";
import Txt from "@/components/atoms/Text";

type Props = {
  savingBalance: number;
};

export default function Savings({ savingBalance }: Props) {
  return (
    <div className="flex flex-col justify-between px-[23px] py-[19px] bg-white-fff rounded-[20px] w-full h-[153px] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
      {/* 적금 제목, 금액, 이미지 */}
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <Txt size={16} weight="bold">
            하나 장병내일준비 적금
          </Txt>
          <Txt size={16} weight="bold">
            {savingBalance.toLocaleString()}원
          </Txt>
        </div>
        <div className="flex-shrink-0 relative ml-[57px] w-[80px] h-[60px]">
          <Image
            src="/images/ic-bankbook.svg"
            alt="적금 통장"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 조건 달성 여부 */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center px-[14px] h-[20px] bg-green-49d rounded-[10px] mr-2">
            <Txt size={12} weight="medium" className="text-white-2f2">
              달성
            </Txt>
          </div>
          <Txt size={12} weight="medium">
            주택청약종합저축
          </Txt>
          <div className="ml-auto">
            <Txt size={10} weight="medium">
              연 0.50%
            </Txt>
          </div>
        </div>

        <div className="flex items-center w-full">
          <div className="flex items-center justify-center px-[9px] h-[20px] bg-white-2f2 rounded-[10px] mr-2">
            <Txt size={12} weight="medium" className="text-green-49d">
              미달성
            </Txt>
          </div>
          <Txt size={12} weight="medium">
            하나카드결제
          </Txt>
          <div className="ml-auto">
            <Txt size={10} weight="medium">
              연 0.70%
            </Txt>
          </div>
        </div>
      </div>
    </div>
  );
}
