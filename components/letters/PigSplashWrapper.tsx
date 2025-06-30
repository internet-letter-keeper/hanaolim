"use client";

import { useState } from "react";
import { PigSplash } from "@/components/letters";

type Props = {
  point: number;
};

export default function PigSplashWrapper({ point }: Props) {
  const [showPoint, setShowPoint] = useState(true);

  return (
    <>
      {showPoint && (
        <PigSplash point={point} onSkip={() => setShowPoint(false)} />
      )}
    </>
  );
}
