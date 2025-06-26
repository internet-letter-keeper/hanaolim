import Image from "next/image";
import Link from "next/link";
import Txt from "@/components/atoms/Text";

type Props = {
  totalCount: number;
};

export default function Letter({ totalCount }: Props) {
  return (
    <Link
      href="/letters"
      className="flex justify-between items-center px-[17px] py-2 w-5/7 h-[61px] rounded-[15px] bg-blue-0f5 border border-blue-af0 cursor-pointer"
    >
      <Txt size={14} weight="medium" className="text-gray-939">
        총 받은 편지
      </Txt>
      <div className="flex items-center gap-[13px]">
        <Txt size={14} weight="heavy" className="text-green-49d">
          {totalCount}장
        </Txt>
        <Image
          src="/images/letter.svg"
          alt="편지 아이콘"
          width={33}
          height={33}
        />
      </div>
    </Link>
  );
}
