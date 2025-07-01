import Image from "next/image";
import Link from "next/link";
import Txt from "@/components/atoms/Text";
import { Card, Olim, Profile, Savings } from "@/components/home";
import Splash from "@/components/home/Splash";
import { getLetterCount } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";

export default async function Page() {
  const session = await requireAuth();
  const userId = session.user.userId;

  const { totalCount, unreadCount } = await getLetterCount(userId);

  return (
    <>
      <Splash unreadLetter={unreadCount} totalCount={totalCount} />

      <div className="flex flex-col relative gap-[15px]">
        <div className="flex justify-between items-center">
          <Image
            src="/icons/ic-hanaolim.svg"
            alt="하나올림 로고"
            width={110}
            height={36}
            style={{ width: 110, height: 36 }}
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

        {/* 컴포넌트 - 군인프로필, 하나올림, 나사카, 군적금 */}
        <Profile />
        <Olim />
        <Card />
        <Savings />
      </div>
    </>
  );
}
