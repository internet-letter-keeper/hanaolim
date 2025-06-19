"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, Olim, Profile, Savings } from "@/components/home";
import RocketSplash from "@/components/home/RocketSplash";

export default function Page() {
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
          <Image
            src="/icons/ic-hanaolim.svg"
            alt="하나올림 로고"
            width={110}
            height={36}
          />
          <Profile endDate={new Date()} />
          <Olim />
          <Card />
          <Savings savingBalance={0} />
        </div>
      )}
    </>
  );
}
