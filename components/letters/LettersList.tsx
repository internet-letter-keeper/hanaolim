"use client";

import Image from "next/image";
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
};

export default function LettersList({ letters }: Props) {
  return (
    <ul className={`px-4 mt-2 flex flex-col gap-4 ${fontMap.cm}`}>
      {letters.map((letter) => (
        <li key={letter.id} className="border-b pb-3">
          <div className="flex justify-between items-start">
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
              <p className="text-[20px] text-gray-353">{letter.writer}</p>
            </div>
            <span className="text-[12px] text-blue-9a0">{letter.createDt}</span>
          </div>
          <p className="text-[15px] text-blue-9a0 mt-1 line-clamp-2">
            {letter.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
