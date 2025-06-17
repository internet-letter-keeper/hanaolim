"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Letter } from "@/types/letters";
import Txt from "../atoms/Text";

type Props = {
  letters: Letter;
};

export default function LettersItem({ letters }: Props) {
  const { id, writer, content, createDt, isFavorite } = letters;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/letters/${id}`);
  };

  return (
    <div className={`mt-4`}>
      <div
        key={id}
        className="border rounded-[10px] border-[#209B98] pb-3 p-3"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start ">
          <div className="flex items-center gap-1">
            <Txt size={20} weight="cm" className="text-gray-353">
              {writer}
            </Txt>
          </div>
          <span className="text-[12px] text-blue-9a0 whitespace-nowrap">
            {createDt}
          </span>
        </div>
        <Txt
          size={15}
          align="left"
          className=" text-blue-9a0 mt-1 line-clamp-2 break-words"
        >
          {content}
        </Txt>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-1 rounded-full border border-red-a76 px-2 py-0.5">
            <Image
              src="/icons/ic-isReply.svg"
              alt="답장도착"
              width={14}
              height={15}
              className="inline-block"
            />
            <Txt size={12} className="text-red-a76">
              답장도착
            </Txt>
          </div>

          <Image
            src={
              isFavorite
                ? "/icons/ic-favorite-colered.svg"
                : "/icons/ic-favorite-none.svg"
            }
            alt="즐겨찾기"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
}
