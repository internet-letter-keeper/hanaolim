"use client";

import { useEffect, useState } from "react";
import { RocketSplash } from ".";

const SPLASH_SKIP_KEY = "skipRocketSplash";

type Props = {
  unreadLetter: number;
  totalCount: number;
};

export default function Splash({ unreadLetter, totalCount }: Props) {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const splashSkipped = sessionStorage.getItem(SPLASH_SKIP_KEY) === "true";
    if (unreadLetter > 0 && !splashSkipped) {
      setShowSplash(true);
    }
  }, [unreadLetter]);

  const handleSkipSplash = () => {
    sessionStorage.setItem(SPLASH_SKIP_KEY, "true");
    setShowSplash(false);
  };

  if (!showSplash) return null;

  return (
    <RocketSplash
      onSkip={handleSkipSplash}
      totalCount={totalCount}
      unreadLetter={unreadLetter}
    />
  );
}
