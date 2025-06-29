"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import SplashScreen from "./HomeSplashScreen";

export default function Splash({ children }: PropsWithChildren) {
  //스플래시 화면 구현하기
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    const alreadySeen = document.cookie.includes("splashSeen=true");

    if (!alreadySeen) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, []);

  //splash 렌더 (브라우저 종료 시 쿠키 사라짐)
  let splashContent = null;

  if (showSplash === null) {
    return null;
  } else if (showSplash) {
    splashContent = (
      <SplashScreen
        onFinish={() => {
          document.cookie = "splashSeen=true; path=/;";
          setShowSplash(false);
        }}
      />
    );
  }

  if (splashContent) {
    return <div className="relative w-full h-screen">{splashContent}</div>;
  }

  return <>{children}</>;
}
