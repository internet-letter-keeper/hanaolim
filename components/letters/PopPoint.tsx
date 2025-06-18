"use client";

import Image from "next/image";
import { Txt } from "../atoms";

//포인트 적립 애니메이션

export default function PointPop() {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 animate-pointPop pointer-events-none">
      <Image
        src="/images/point-earn.svg"
        alt="폭죽 이미지"
        width={50}
        height={50}
      />
      <Txt size={18} className="text-white-fff">
        +100P 적립 완료!
      </Txt>
    </div>
  );
}
