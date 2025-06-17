"use client";

import Image from "next/image";
import Txt from "@/components/atoms/Text";
import { Progress } from "@/components/ui/progress";

type Props = {
  endDate: Date;
  userName?: string;
  startDate?: Date;
};

export default function ProfileBanner({ userName, startDate, endDate }: Props) {
  const startDateObj = new Date(startDate ?? "2024-06-01");
  const endDateObj = new Date(endDate);
  const today = new Date();

  // 전체 복무 기간 = 전역일 - 입대일
  const totalDays = Math.ceil(
    (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 오늘까지 복무한 일 수 = 오늘 - 입대일
  const passedDays = Math.ceil(
    (today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 전역일까지 남은 일 수 = 전역일 - 오늘
  const untilEndDate = Math.ceil(
    (endDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 복무 진행률 (%) = (복무한 일 수 / 전체 복무 기간) × 100
  const progressPercent = Math.min(100, (passedDays / totalDays) * 100);
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-530 border-[1.5px] border-green-a3b rounded-[30px] w-full h-[89px] relative overflow-hidden">
      {/* 캐릭터 이미지 */}
      <div className="flex-shrink-0 relative w-[85px] h-[85px]">
        <Image
          src="/images/ic-byeoldol.svg"
          alt="별돌이 프로필"
          fill
          priority
        />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        {/* 군인 이름 */}
        <div className="flex justify-between items-baseline w-full">
          <Txt size={20} weight="cm" className="text-yellow-895 truncate">
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
        <div className="mt-[4px] w-full">
          <Progress variant="green" />
          <div className="flex items-baseline gap-[2px] mt-[4px]">
            <Txt size={12} weight="cm" className="text-white">
              전역까지
            </Txt>
            <Txt size={12} weight="heavy" className="text-yellow-895">
              {untilEndDate}일
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
