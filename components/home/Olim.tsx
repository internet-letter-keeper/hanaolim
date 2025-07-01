import Image from "next/image";
import Link from "next/link";
import Txt from "@/components/atoms/Text";
import { getEarnedPoint, getLetterCount } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import Letter from "./hanaolim/Letter";
import Point from "./hanaolim/Point";

export default async function Olim() {
  const session = await requireAuth();
  const userId = session.user.userId;
  const soldierId = session.user.soldier.soldierId;

  const { totalCount, unreadCount } = await getLetterCount(userId);
  const { letterExp } = await getEarnedPoint(userId);

  return (
    <div className="flex flex-col justify-between pl-[26px] py-[27px] pr-[22px] bg-white-fff rounded-[20px] shadow-[0_0_5px_rgba(0,0,0,0.15)]">
      <Link href={`/cabinet/${soldierId}`} className="block w-full">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-start flex-shrink">
            <Txt size={22} weight="bold" className="text-green-49d mb-1">
              하나올림
            </Txt>
            <Txt size={18} weight="bold" className="leading-tight">
              읽지 않은 편지{" "}
              <Txt size={18} weight="bold" className="text-green-49d">
                {unreadCount}장
              </Txt>
              을
            </Txt>
            <Txt size={18} weight="bold" className="leading-tight">
              확인해 보세요!
            </Txt>

            <div className="flex items-center gap-[4px] mt-[10px] mb-[23px]">
              <Txt size={12} weight="cm" className="text-gray-353">
                확인하기
              </Txt>
              <Image
                src="/icons/ic-chevron-right.svg"
                alt="확인하기 아이콘"
                width={5}
                height={10}
                style={{ width: 5, height: 10 }}
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
      </Link>

      {/* 편지 + 포인트 */}
      <div className="flex flex-col gap-[12px]">
        <Letter totalCount={totalCount} />
        <Point letterExp={letterExp} />
      </div>
    </div>
  );
}
