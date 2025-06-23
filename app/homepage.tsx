"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
<<<<<<< HEAD
  unreadLetter: number;
=======
>>>>>>> 5d7e5aa (Feat: 홈 하나올림 내 포인트 컴포넌트 API 연결)
};

export default function HomePage({
  userName,
  startDate,
  endDate,
  accountNum,
  accountBalance,
  savingsBalance,
  letterExp,
  unreadLetter,
}: Props) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSkip = () => setShowSplash(false);

  return (
    <>
      {showSplash && (
        <RocketSplash
          onSkip={handleSkip}
          letterExp={letterExp}
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
            {/* 로그아웃 링크 */}
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
          <Olim letterExp={letterExp} unreadLetter={unreadLetter} />
          <Card accountNum={accountNum} accountBalance={accountBalance} />
          <Savings savingsBalance={savingsBalance} />
        </div>
      )}
    </>
  );
}
