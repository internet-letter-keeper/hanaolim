"use client";

import Image from "next/image";
import { ReceivedTotalLetter } from "@/types/letters";
import Txt from "@/components/atoms/Text";

type Props = {
  receivedTotalLetter: ReceivedTotalLetter;
};

export default function Letter({ receivedTotalLetter }: Props) {
  return (
    <div className="flex items-center px-4 py-2 w-fit h-[61px] rounded-[15px] bg-blue-0f5 border border-blue-af0">
      <Txt size={14} weight="medium" className="text-gray-939">
        받은 편지
      </Txt>
      <Txt size={14} weight="heavy" className="text-green-49d ml-[24px]">
        {receivedTotalLetter.unreadLetter}/{receivedTotalLetter.totalLetter}
      </Txt>
      <Image
        src="/images/ic-letter.svg"
        alt="편지 아이콘"
        width={33}
        height={33}
        className="ml-[13px]"
      />
    </div>
  );
}
