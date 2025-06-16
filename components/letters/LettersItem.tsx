"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Txt, { fontMap } from "../atoms/Text";

type LetterItem = {
  id: number;
  writer: string;
  content: string;
  createDt: string;
  isFavorite?: boolean;
};

type Props = {
  letters: LetterItem;
};

export default function LettersItem({ letters }: Props) {
  const { id, writer, content, createDt, isFavorite } = letters;

  const router = useRouter();

  const handleClick = () => {
    router.push(`/letters/${id}`);
  };

  return (
    <div className={`mt-4 ${fontMap.cm}`}>
      <div
        key={id}
        className="border-b border-gray-ada pb-3"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start ">
          <div className="flex items-center gap-1">
            <Image
              src={
                isFavorite
                  ? "/icons/ic-favorite-colered.svg"
                  : "/icons/ic-favorite-none.svg"
              }
              alt="즐겨찾기"
              width={15}
              height={15}
            />
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
      </div>
    </div>
  );
}
