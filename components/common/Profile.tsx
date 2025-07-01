import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/contexts/toast/ToastContext";
import { calculateRankByStartDate, dDayConCatString } from "@/utils/date";
import { Txt } from "../atoms";
import { RankNumMap } from "./FriendProfileCircle";

export default function Profile() {
  const { showToast } = useToast();
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  const { user } = session;
  const isSoldier = user.isSoldier;

  const endDate = user.soldier?.endDate ? new Date(user.soldier.endDate) : null;

  const startDate = user.soldier?.startDate
    ? new Date(user.soldier.startDate)
    : null;

  // 군인일 경우에만 계산
  const dDay = isSoldier && endDate ? dDayConCatString(endDate) : null;

  const rank =
    isSoldier && startDate ? calculateRankByStartDate(startDate) : null;

  const handleCopyCode = () => {
    if (isSoldier && user.soldier.code) {
      navigator.clipboard.writeText(user.soldier.code);
      showToast("코드가 복사되었습니다!");
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex border border-green-49d rounded-full p-[6px] items-center justify-center">
        <Image
          src={
            isSoldier && rank
              ? `/images/profilepic-${RankNumMap[rank]}.svg`
              : "/images/white-byeoldol.svg"
          }
          alt="profile-icon"
          width={55}
          height={55}
          className="w-[55px] h-[55px]"
        />
      </div>
      <div>
        {isSoldier ? (
          <div className="flex flex-col">
            {dDay && (
              <div className="flex w-fit items-center justify-center bg-green-49d rounded-[4px] px-2 py-[1px]">
                <Txt size={13} className="text-white-fff" weight="medium">
                  {dDay}
                </Txt>
              </div>
            )}
            <div className="flex flex-row">
              <Txt size={20} className="text-green-49d" weight="medium">
                {user.userName}
              </Txt>
              <Txt size={20} weight="medium">
                님의 관물대
              </Txt>
            </div>
            {user.soldier?.soldierId && (
              <button
                className="flex flex-row gap-2 align-bottom"
                onClick={handleCopyCode}
              >
                <Txt size={13} weight="medium" className="underline">
                  {user.soldier.code}
                </Txt>
                <Image
                  src="/icons/ic-copy.svg"
                  alt="copy-icon"
                  width={12}
                  height={12}
                  className="w-[12px] h-[12px]"
                />
              </button>
            )}
          </div>
        ) : (
          <>
            <Txt size={20} className="text-gray-353" weight="medium">
              안녕하세요&nbsp;
            </Txt>
            <Txt size={20} className="text-green-49d" weight="medium">
              {user.userName}
            </Txt>
            <Txt size={20} className="text-gray-353" weight="medium">
              님
            </Txt>
          </>
        )}
      </div>
    </div>
  );
}
