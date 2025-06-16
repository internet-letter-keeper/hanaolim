"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PointAccrue } from "@/types/points";
import Txt from "@/components/atoms/Text";
import { Progress } from "@/components/ui/progress";

type Props = {
  pointAccrue: PointAccrue;
};

export default function Point({ pointAccrue }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pointHistory");
  };

  return (
    <div className="w-fit px-4 py-3 rounded-[15px] bg-yellow-4d8 border border-yellow-9af flex flex-col gap-[6px]">
      <div className="flex items-center w-full">
        <Txt size={14} weight="medium" className="text-gray-939">
          포인트 적립까지
        </Txt>

        <div className="flex items-center">
          <Txt size={14} weight="heavy" className="text-yellow-32b ml-[17px]">
            {pointAccrue.myStamp}/{pointAccrue.totalStamp}
          </Txt>
          <Image
            src="/images/ic-coin.svg"
            alt="코인 아이콘"
            width={25}
            height={25}
            className="ml-[9px]"
          />
          <Image
            src="/images/ic-question.svg"
            alt="도움말 아이콘"
            width={15}
            height={15}
            className="ml-[60px]"
          />
        </div>
      </div>

      {/* 포인트 적립 진행률 바 */}
      <div>
        <Progress variant="yellow" />
      </div>

      {/* 포인트 내역 조회로 이동 */}
      <Txt
        size={12}
        weight="medium"
        className="text-gray-353 underline self-end cursor-pointer"
        onClick={handleClick}
      >
        포인트 내역보기
      </Txt>
    </div>
  );
}
