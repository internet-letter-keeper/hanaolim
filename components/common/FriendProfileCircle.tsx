import { dDayConCatString } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import {
  FriendProfile,
  SoldierProfile,
  SoldierRank,
  SoldierRankToNum,
} from "@/types/common/profile";
import { cn } from "@/lib/utils";
import Txt from "@/components/atoms/Text";

const RankNumMap: Record<SoldierRank, SoldierRankToNum> = {
  이병: 1,
  일병: 2,
  상병: 3,
  병장: 4,
};

type Props = {
  profile: FriendProfile | SoldierProfile;
  isRowLayout?: boolean;
};

export default function FriendProfileCircle({
  profile,
  isRowLayout = false,
}: Props) {
  const { userName, rank, endDate, soldierId } = profile;

  const dDay = dDayConCatString(endDate);

  return (
    <Link
      href={`/cabinet/${soldierId}`}
      className={cn("whitespace-nowrap flex items-center flex-col", {
        "flex-row gap-[10px]": isRowLayout,
      })}
    >
      <div className="relative">
        {/* 계급 아이콘 */}
        <div className="flex items-center border border-green-49d justify-center bg-white p-[6px] rounded-full">
          <Image
            src={`/images/profilepic-${RankNumMap[rank]}.svg`}
            alt={rank}
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
    </Link>
  );
}
