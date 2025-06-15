"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { fontMap } from "../atoms/Text";

type Letter = {
  id: number;
  writer: string;
  content: string;
  createDt: string;
  isFavorite?: boolean;
};

type Props = {
  letters: Letter[];
  totalCount: number;
  filter: "all" | "favorite";
  onChangeFilter: (value: "all" | "favorite") => void;
};

export default function LettersList({
  letters,
  totalCount,
  filter,
  onChangeFilter,
}: Props) {
  return (
    <div className={`mt-4 ${fontMap.cm}`}>
      <div className="flex justify-between items-center px-4 mb-2 text-[11px] text-black-939">
        <span className="font-medium">총 {totalCount}개</span>
        <div className="flex gap-3">
          <button
            onClick={() => onChangeFilter("all")}
            className={cn(
              filter === "all" ? "text-[#209B98]" : "text-black-939"
            )}
          >
            전체
          </button>
          <span className="text-black-939">|</span>
          <button
            onClick={() => onChangeFilter("favorite")}
            className={cn(
              filter === "favorite" ? "text-[#209B98]" : "text-black-939"
            )}
          >
            즐겨찾는 편지
          </button>
        </div>
      </div>
      <hr />
      <br />

      <ul className="flex flex-col gap-4">
        {letters.map((letter) => (
          <li key={letter.id} className="border-b pb-3">
            <div className="flex justify-between items-start ">
              <div className="flex items-center gap-1">
                <Image
                  src={
                    letter.isFavorite
                      ? "/icons/ic-favorite-colered.svg"
                      : "/icons/ic-favorite-none.svg"
                  }
                  alt="즐겨찾기"
                  width={15}
                  height={15}
                />
                <p className="text-[20px] text-gray-353 truncate">
                  {letter.writer}
                </p>
              </div>
              <span className="text-[12px] text-blue-9a0 whitespace-nowrap">
                {letter.createDt}
              </span>
            </div>
            <p className="text-[15px] text-blue-9a0 mt-1 line-clamp-2 break-words">
              {letter.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
