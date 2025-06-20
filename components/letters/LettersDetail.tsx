"use client";

import Image from "next/image";
import { Txt } from "@/components/atoms";

type Props = {
  lettersDetail: {
    content: string;
    fileUrl?: string;
    senderNickname?: string;
    senderUserName: string;
    receiverName: string;
    createDate: Date | string;
  };
};

export default function LettersDetail({ lettersDetail }: Props) {
  const {
    fileUrl,
    senderNickname,
    senderUserName,
    receiverName,
    content,
    createDate,
  } = lettersDetail;

  return (
    <div>
      {/* 받는 사람 */}
      <div className="flex justify-between items-center mb-1">
        <Txt size={16} weight="cm" className="text-green-49d">
          To. {receiverName}
        </Txt>
      </div>

      <div className="flex">
        <Txt size={12} weight="cm" className="text-blue-9a0">
          {createDate as string}
        </Txt>
      </div>

      {/* 편지 내용 */}
      <div className="mt-4 mb-4">
        <Txt
          size={15}
          weight="cm"
          align="left"
          className="leading-relaxed whitespace-pre-line"
        >
          {content}
        </Txt>
      </div>

      {/* 첨부파일 */}
      {fileUrl && (
        <div className="w-full bg-gray-200 flex items-center justify-center rounded-md mb-4">
          {fileUrl.endsWith(".mp4") || fileUrl.endsWith(".webm") ? (
            <video
              src={fileUrl}
              width={100}
              height={120}
              controls
              className="rounded-md w-full h-auto object-contain"
            />
          ) : (
            <Image
              src={fileUrl}
              alt="첨부 이미지"
              width={100}
              height={120}
              className="rounded-md w-full h-full object-contain"
            />
          )}
        </div>
      )}

      {/* 보내는 사람 */}
      {/* 보내는 사람 닉네임 없을 경우(군인) : 답장 */}
      <div className="flex justify-end">
        <Txt size={16} weight="cm" className="text-green-49d">
          From. {senderUserName}
          {senderNickname ? ` (${senderNickname})` : ""}
        </Txt>
      </div>
    </div>
  );
}
