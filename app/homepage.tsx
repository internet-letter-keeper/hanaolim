import Image from "next/image";
import Link from "next/link";
import Txt from "@/components/atoms/Text";
import { Card, Olim, Profile, Savings } from "@/components/home";

type Props = {
  letterExp: number;
  unreadLetter: number;
  soldierId: number;
  totalCount: number;
};

export default function HomePage({
  letterExp,
  unreadLetter,
  soldierId,
  totalCount,
}: Props) {
  return (
    <>
      <div className="flex flex-col relative gap-[15px]">
        <div className="flex justify-between items-center">
          <Image
            src="/icons/ic-hanaolim.svg"
            alt="하나올림 로고"
            width={110}
            height={36}
          />
          <Link href="/api/auth/signout">
            <Txt
              size={12}
              className="text-gray-353 underline underline-offset-auto"
            >
              로그아웃
            </Txt>
          </Link>
        </div>

        <Profile />
        <Olim
          letterExp={letterExp}
          unreadLetter={unreadLetter}
          soldierId={soldierId}
          totalCount={totalCount}
        />
        <Card />
        <Savings />
      </div>
    </>
  );
}
