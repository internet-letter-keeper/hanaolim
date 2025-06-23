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
};

export default function HomePage({
  userName,
  startDate,
  endDate,
  accountNum,
  accountBalance,
}: Props) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const isSeen = localStorage.getItem("isSplashSeen");
    if (isSeen === "true") {
      setShowSplash(false);
    }
  }, []);

  const handleSkip = () => setShowSplash(false);

  return (
    <>
      {showSplash && <RocketSplash onSkip={handleSkip} />}
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
          <Olim />
          <Card accountNum={accountNum} accountBalance={accountBalance} />
          <Savings savingBalance={0} />
        </div>
      )}
    </>
  );
}
