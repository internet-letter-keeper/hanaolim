import Image from "next/image";
import Link from "next/link";
import Txt from "@/components/atoms/Text";
import { getFriendsList } from "@/lib/actions/friend-actions";
import { cn } from "@/lib/utils";
import {
  SoldierProfile,
  SoldierRank,
  SoldierRankToNum,
} from "@/types/common/profile";
import { dDayConCatString } from "@/utils/date";

export const RankNumMap: Record<SoldierRank, SoldierRankToNum> = {
  이병: 1,
  일병: 2,
  상병: 3,
  병장: 4,
};

type Props = {
  profile:
    | Awaited<ReturnType<typeof getFriendsList>>["data"][number]
    | SoldierProfile;
  isRowLayout?: boolean;
  selectedSoldierId?: number;
};

export default function FriendProfileCircle({
  profile,
  isRowLayout = false,
  selectedSoldierId,
}: Props) {
  const { userName, rank, endDate, soldierId } = profile;

  const dDay = dDayConCatString(endDate);

  const isClickedProfile = selectedSoldierId === soldierId;

  return (
    <Link
      href={`/cabinet/${soldierId}`}
      replace
      className={cn("whitespace-nowrap flex items-center flex-col", {
        "flex-row gap-[10px]": isRowLayout,
      })}
    >
      <div className="relative">
        {/* 계급 아이콘 */}
        <div
          className={cn("p-[1px]", {
            "p-[2px] bg-gradient-to-b from-[#F14A7666] to-red-a76 rounded-full":
              isClickedProfile,
          })}
        >
          <div
            className={cn(
              "flex items-center justify-center bg-white p-[6px] rounded-full",
              {
                "border border-green-49d ": !isClickedProfile,
              }
            )}
          >
            <Image
              src={`/images/profilepic-${RankNumMap[rank]}.svg`}
              alt={rank}
              width={37}
              height={37}
            />
          </div>
        </div>

        {/* 전역일 디데이 */}
        <div
          className={cn(
            "rounded-[4px] px-[4px] absolute left-1/2 -translate-x-1/2 -bottom-[2px] translate-y-1/2 bg-green-49d flex justify-center",
            { "bg-red-a76": isClickedProfile }
          )}
        >
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
