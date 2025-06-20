"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Txt } from "../atoms";

type CustomLetter = {
  letterId: number;
  nickname: string;
  content: string;
  createDate: string | Date;
  isFavorite: boolean;
  isRead: boolean;
  parentLetterId?: number | null;
};

type Props = {
  letters: CustomLetter;
  allLetters: CustomLetter[];
};

export default function LettersItem({ letters, allLetters }: Props) {
  const {
    letterId,
    nickname,
    content,
    createDate,
    isFavorite: initialFavorite,
    isRead,
  } = letters;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const router = useRouter();
  const handleClick = () => router.push(`/letters/${letterId}`);

  const hasReply = allLetters.some((l) => l.parentLetterId === letterId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="mt-4 bg-white">
      <div
        className="border rounded-[10px] border-[#209B98] pb-3 p-3"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start">
          <Txt
            size={20}
            weight="cm"
            className={isRead ? "text-[#AAAAAA]" : "text-gray-353"}
          >
            {nickname}
          </Txt>
          <span className="text-[12px] text-blue-9a0 whitespace-nowrap">
            {createDate as string}
          </span>
        </div>

        <Txt
          size={15}
          align="left"
          className="text-blue-9a0 mt-1 line-clamp-2 break-words"
        >
          {content}
        </Txt>

        <div className="flex justify-between items-center w-full mt-2">
          {hasReply ? (
            <div className="flex items-center gap-1 rounded-full border border-red-a76 px-2 py-0.5">
              <Image
                src="/icons/ic-isReply.svg"
                alt="답장도착"
                width={14}
                height={15}
              />
              <Txt size={12} className="text-red-a76">
                답장도착
              </Txt>
            </div>
          ) : (
            <div />
          )}

          <Image
            src={
              isFavorite
                ? "/icons/ic-favorite-colered.svg"
                : "/icons/ic-favorite-none.svg"
            }
            alt="즐겨찾기"
            width={20}
            height={20}
            onClick={handleToggleFavorite}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
