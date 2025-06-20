"use client";

import Image from "next/image";
import Link from "next/dist/client/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Txt from "@/components/atoms/Text";
import { Card, Olim, Profile, Savings } from "@/components/home";
import RocketSplash from "@/components/home/RocketSplash";

export default function Page() {
  const { data: session } = useSession();
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
            {session?.user ? (
              <Link href="api/auth/signout">
                <Txt
                  size={12}
                  className="text-gray-353 underline underline-offset-auto"
                >
                  로그아웃
                </Txt>
              </Link>
            ) : (
              <Link href="/auth/signIn">
                <Txt
                  size={12}
                  className="text-gray-353 underline underline-offset-auto"
                >
                  로그인
                </Txt>
              </Link>
            )}
          </div>
          <Profile endDate={new Date()} />
          <Olim />
          <Card />
          <Savings savingBalance={0} />
        </div>
      )}
    </>
  );
}
