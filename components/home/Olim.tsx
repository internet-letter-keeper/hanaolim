"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Txt from "@/components/atoms/Text";
import Letter from "./hanaolim/Letter";
import Point from "./hanaolim/Point";

const receivedTotalLetter = { unreadLetter: 0, totalLetter: 32 };
const pointAccrue = { myStamp: 2, totalStamp: 10 };

export default function Olim() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between pl-[26px] py-[27px] pr-[22px] bg-white-fff rounded-[20px] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-start flex-shrink">
          <Txt size={22} weight="bold" className="text-green-49d mb-1">
            하나올림
          </Txt>
          <Txt size={18} weight="bold" className="leading-tight">
            일주일 동안{" "}
            <Txt size={18} weight="bold" className="text-green-49d">
              {receivedTotalLetter.unreadLetter}장
            </Txt>
            의 편지가
          </Txt>
          <Txt size={18} weight="bold" className="leading-tight">
            도착했어요!
          </Txt>

          <div
            className="flex items-center gap-[4px] mt-[10px] mb-[23px] cursor-pointer"
            onClick={() => router.push("/cabinet/Cabinet")}
          >
            <Txt size={12} weight="cm" className="text-gray-353">
              확인하기
            </Txt>
            <Image
              src="/icons/ic-chevron-right.svg"
              alt="확인하기 아이콘"
              width={5}
              height={10}
            />
          </div>
        </div>

        <div className="flex-shrink-0 relative mt-[36px] w-[98px] h-[91px]">
          <Image
            src="/images/hanabox.svg"
            alt="하나 편지코인박스"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* 편지+포인트 */}
      <div className="flex flex-col gap-[12px]">
        <Letter receivedTotalLetter={receivedTotalLetter} />
        <Point pointAccrue={pointAccrue} />
      </div>
    </div>
  );
}
