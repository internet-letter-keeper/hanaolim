"use client";

import Image from "next/image";
import Txt from "@/components/atoms/Text";

type Props = {
  userName?: string;
  endDate: string;
};

export default function ProfileBanner({ userName, endDate }: Props) {
  const remainDays = Math.ceil(
    (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="w-[337px] h-[89px] bg-gray-530 border-[1.5px] border-green-a3b rounded-[30px] flex items-center gap-3 px-4 py-3 relative overflow-hidden">
      {/* 캐릭터 이미지 */}
      <div className="w-[85.33px] h-[128px] relative">
        <Image
          src="/images/ic-byeoldol.svg"
          alt="별돌이 프로필"
          fill
          priority
        />
      </div>

      <div className="flex flex-col justify-center flex-1">
        {/* 군인 이름 */}
        <div className="flex justify-between items-baseline w-full">
          <Txt size={20} weight="cm" className="text-yellow-895">
            {userName || "별돌이"}
          </Txt>
          <Txt
            size={12}
            weight="medium"
            className="text-green-fa7 leading-[16px]"
          >
            대한민국 군인
          </Txt>
        </div>

        {/* 진행 바 + 전역일 디데이 */}
        <div className="mt-[4px]">
          <div className="w-full h-[6px] bg-whi rounded-full overflow-hidden mb-[4px]">
            <div
              className="h-full bg-green-a3b transition-all duration-300 ease-out"
              style={{
                width: `${Math.min(100, 100 - (remainDays / 730) * 100)}%`,
              }}
            />
          </div>
          <div className="flex items-baseline gap-[2px]">
            <Txt size={12} weight="cm" className="text-white">
              전역까지
            </Txt>
            <Txt size={12} weight="heavy" className="text-yellow-895">
              {remainDays}일
            </Txt>
            <Txt size={12} weight="cm" className="text-white">
              남았어요!
            </Txt>
          </div>
        </div>
      </div>
    </div>
  );
}
