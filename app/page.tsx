import Image from "next/image";
import Link from "next/link";
import { Txt } from "@/components/atoms";
import { Card, Olim, Profile, Savings, Splash } from "@/components/home";
import { getLetterCount } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";

export default async function Page() {
  const session = await requireAuth();
  const userId = session.user.userId;

  const { data } = await getLetterCount(userId);
  if (!data) return null;

  const { totalCount, unreadCount } = data;

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
            className="w-[110px] h-[36px]"
          />
          <Link href="/api/auth/signout">
            <Txt
              size={12}
              className="text-gray-353 underline underline-offset-3"
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
