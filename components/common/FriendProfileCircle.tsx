"use client";

import { dDayConCatString } from "@/utils/date";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FriendProfile } from "@/types/common/profile";
import { cn } from "@/lib/utils";
import Txt from "@/components/atoms/Text";

const AltMap: Record<FriendProfile["level"], string> = {
  1: "이병",
  2: "일병",
  3: "상병",
  4: "병장",
};

type Props = {
  profile: FriendProfile;
  isRowLayout?: boolean;
};

export default function FriendProfileCircle({
  profile,
  isRowLayout = false,
}: Props) {
  const navigation = useRouter();

  const { userName, endDate, code, level } = profile;

  const dDay = dDayConCatString(endDate);

  const onClick = () => navigation.push(`/cabinet/${code}`);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("whitespace-nowrap flex items-center flex-col", {
        "flex-row gap-[10px]": isRowLayout,
      })}
    >
      <div className="relative">
        {/* 계급 아이콘 */}
        <div className="flex items-center border border-green-49d justify-center bg-white p-[6px] rounded-full">
          <Image
            src={`/images/profilepic-${level}.svg`}
            alt={AltMap[level]}
            width={37}
            height={37}
          />
        </div>

        {/* 전역일 디데이 */}
        <div className="rounded-[4px] px-[4px] absolute left-1/2 -translate-x-1/2 -bottom-[2px] translate-y-1/2 bg-green-49d flex justify-center">
          <Txt size={10} weight="bold" className="text-white">
            {dDay}
          </Txt>
        </div>
      </div>

      {/* 군인 이름 */}
      <Txt className="mt-[12px]" weight="medium" size={isRowLayout ? 12 : 14}>
        {userName}
      </Txt>
    </button>
  );
}
