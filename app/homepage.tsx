"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Txt from "@/components/atoms/Text";
import { Card, Olim, Profile, Savings } from "@/components/home";
import RocketSplash from "@/components/home/RocketSplash";

type Props = {
  userName: string;
  startDate: string;
  endDate: string;
  accountNum: string;
  accountBalance: number;
  savingsBalance: number;
  letterExp: number;
  unreadLetter: number;
  soldierId: number;
  totalCount: number;
};

const SPLASH_SKIP_KEY = "skipRocketSplash";

export default function HomePage({
  userName,
  startDate,
  endDate,
  accountNum,
  accountBalance,
  savingsBalance,
  letterExp,
  unreadLetter,
  soldierId,
  totalCount,
}: Props) {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false); // hydration 이슈 방지

  useEffect(() => {
    const splashSkipped = sessionStorage.getItem(SPLASH_SKIP_KEY) === "true";

    if (unreadLetter > 0 && !splashSkipped) {
      setShowSplash(true);
    }

    setMounted(true);
  }, [unreadLetter, totalCount]);

  const handleSkipSplash = () => {
    sessionStorage.setItem(SPLASH_SKIP_KEY, "true");
    setShowSplash(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showSplash && (
        <RocketSplash
          onSkip={handleSkipSplash}
          totalCount={totalCount}
          unreadLetter={unreadLetter}
        />
      )}

      {!showSplash && (
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

          <Profile
            userName={userName}
            startDate={startDate}
            endDate={new Date(endDate)}
          />
          <Olim
            letterExp={letterExp}
            unreadLetter={unreadLetter}
            soldierId={soldierId}
            totalCount={totalCount}
          />
          <Card accountNum={accountNum} accountBalance={accountBalance} />
          <Savings savingsBalance={savingsBalance} />
        </div>
      )}
    </>
  );
}
