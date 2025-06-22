"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Txt } from "../atoms";

type CustomLetter = {
  letterId: number;
  nickname: string;
  content: string;
  createDate: string;
  readDate?: string | null;
  isFavorite: boolean;
  parentLetterId?: number | null;
  receiverId: number;
  senderId: number;
};

type Props = {
  letters: CustomLetter;
  allLetters: CustomLetter[];
  currentUserId: number;
};

export default function LettersItem({
  letters,
  allLetters,
  currentUserId,
}: Props) {
  const {
    letterId,
    nickname,
    content,
    createDate,
    isFavorite: initialFavorite,
    readDate,
    receiverId,
    senderId,
  } = letters;

  const isRead = !!readDate;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  // 날짜 포맷
  const [formattedDate, setFormattedDate] = useState("");
  useEffect(() => {
    const date = new Date(createDate);
    const formatted = date.toLocaleString("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    });
    setFormattedDate(formatted);
  }, [createDate]);

  // 답장 존재 여부
  const hasReply = allLetters.some((l) => l.parentLetterId === letterId);

  // 답장하기 보여줄 조건: 내가 받은 편지 && 내가 아직 답장 안 한 편지
  const shouldShowReplyButton =
    receiverId === currentUserId &&
    !allLetters.some(
      (l) => l.parentLetterId === letterId && l.senderId === currentUserId
    );

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="flex w-full mt-4 bg-white mx-auto">
      <Link
        href={`/letters/${letterId}`}
        className="w-full block border rounded-[10px] border-[#209B98] pb-3 p-3"
      >
        <div className="flex justify-between items-start">
          <Txt
            size={20}
            weight="cm"
            className={isRead ? "text-[#AAAAAA]" : "text-gray-353"}
          >
            {nickname ?? ""}
          </Txt>
          <span className="text-[12px] text-blue-9a0 whitespace-nowrap">
            {formattedDate}
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
          {shouldShowReplyButton && (
            <div className="flex items-center gap-1 rounded-full border border-red-a76 px-2 py-0.5">
              <Image
                src="/icons/ic-isReply.svg"
                alt="답장하기"
                width={14}
                height={15}
              />
              <Txt size={12} className="text-red-a76">
                답장하기
              </Txt>
            </div>
          )}

          {!shouldShowReplyButton && senderId === currentUserId && hasReply && (
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
          )}

          {!shouldShowReplyButton &&
            (!hasReply || receiverId === currentUserId) && <div />}

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
      </Link>
    </div>
  );
}
