"use client";

import Image from "next/image";
import Txt from "@/components/atoms/Text";
import { Progress } from "@/components/ui/progress";
import {
  untilEndDate,
  dDayConCatString,
  calculateRankByStartDate,
} from "@/utils/date";

type Props = {
  endDate: Date;
  userName: string;
  startDate?: string;
};

export default function ProfileBanner({ userName, startDate, endDate }: Props) {
  const startDateObj = new Date(startDate ?? "2024-06-01");
  const endDateObj = new Date(endDate);
  const today = new Date();

  // 남은 복무일
  const until = untilEndDate(endDateObj);

  // 전체 복무일
  const totalDays = Math.ceil(
    (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 현재까지 복무일
  const passedDays = Math.ceil(
    (today.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 복무 진행률 게이지 계산
  const progressPercent = Math.min(100, (passedDays / totalDays) * 100);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-530 border-[1.5px] border-green-a3b rounded-[30px] w-full h-[89px] relative overflow-hidden">
      {/* 캐릭터 이미지 */}
      <div className="flex-shrink-0 relative w-[85px] h-[85px]">
        <Image src="/images/byeoldol.svg" alt="별돌이 프로필" fill priority />
      </div>
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex justify-between items-baseline w-full">
          <Txt size={20} weight="cm" className="text-yellow-895 truncate">
            {userName}
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
          <Progress variant="green" value={progressPercent} />
          {until < 0 ? (
            // 전역 전
            <div className="flex items-baseline gap-[2px] mt-[4px]">
              <Txt size={12} weight="cm" className="text-white">
                전역까지
              </Txt>
              <Txt size={12} weight="heavy" className="text-yellow-895">
                {Math.abs(until)}일
              </Txt>
              <Txt size={12} weight="cm" className="text-white">
                남았어요!
              </Txt>
            </div>
          ) : until === 0 ? (
            // 전역 당일
            <div className="flex items-baseline gap-[2px] mt-[4px]">
              <Txt size={12} weight="medium" className="text-yellow-895">
                오늘 전역을 축하합니다!
              </Txt>
            </div>
          ) : (
            // 전역 이후
            <div className="flex items-baseline gap-[2px] mt-[4px]">
              <Txt size={12} weight="cm" className="text-white">
                전역을 축하합니다! (
              </Txt>
              <Txt size={12} weight="heavy" className="text-yellow-895">
                전역 {until}일째
              </Txt>
              <Txt size={12} weight="cm" className="text-white">
                )
              </Txt>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
