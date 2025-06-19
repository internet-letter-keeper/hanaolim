"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReceivedTotalLetter } from "@/types/letters";
import Txt from "@/components/atoms/Text";

type Props = {
  receivedTotalLetter: ReceivedTotalLetter;
};

export default function Letter({ receivedTotalLetter }: Props) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/letters");
  };

  return (
    <div
      onClick={handleClick}
      className="flex justify-between items-center px-[17px] py-2 w-3/5 h-[61px] rounded-[15px] bg-blue-0f5 border border-blue-af0 cursor-pointer"
    >
      <Txt size={14} weight="medium" className="text-gray-939">
        받은 편지
      </Txt>
      <div className="flex items-center gap-[13px]">
        <Txt size={14} weight="heavy" className="text-green-49d">
          {receivedTotalLetter.unreadLetter}/{receivedTotalLetter.totalLetter}
        </Txt>
        <Image
          src="/images/letter.svg"
          alt="편지 아이콘"
          width={33}
          height={33}
        />
      </div>
    </div>
  );
}
