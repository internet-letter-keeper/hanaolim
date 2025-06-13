"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FriendProfile } from "@/types/common/profile";
import Txt from "@/components/atoms/Text";

const AltMap: Record<FriendProfile["level"], string> = {
  1: "이병",
  2: "일병",
  3: "상병",
  4: "병장",
};

type Props = {
  profile: FriendProfile;
};

export default function FriendProfileCircle({ profile }: Props) {
  const navigation = useRouter();

  const { userName, endDate, code, level } = profile;

  const untilEndDate = Math.floor(
    (new Date().getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const dDay = untilEndDate < 0 ? `D${untilEndDate}` : `D+${untilEndDate}`;

  const onClick = () => navigation.push(`/cabinet/${code}`);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer whitespace-nowrap"
    >
      <div className="bg-white relative">
        {/* 계급 아이콘 */}
        <div className="flex items-center border border-green-49d justify-center bg-white p-[6px] rounded-full">
          <Image
            src={`/icons/ic-profilepic-${level}.svg`}
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
      <Txt className="mt-[12px] text-gray-353" weight="medium" size={12}>
        {userName}
      </Txt>
    </button>
  );
}
