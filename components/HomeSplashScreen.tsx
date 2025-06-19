"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1000);
    const t2 = setTimeout(() => {
      onFinish();
    }, 1400); // fade 끝나고 onFinish

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div
      className={cn(
        "absolute inset-0 -m-4 z-50 transition-opacity duration-1000 ease-in-out opacity-100",
        { "opacity-0": fadeOut }
      )}
    >
      <Image
        src="/images/home-splash.png"
        alt="올림의 스플래시 화면"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
