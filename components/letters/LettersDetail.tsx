"use client";

import Image from "next/image";
import { Letter } from "@/types/letters";
import { cn } from "@/lib/utils";
import { Txt } from "@/components/atoms";

type Props = {
  lettersDetail: Letter;
};

export default function LettersDetail({ lettersDetail }: Props) {
  const { id, fileUrl, parentId, writer, content, createDt } = lettersDetail;
  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4")}>
      <div className="flex justify-center items-center">
        <div className="flex items-center gap-1 mt-2 mb-4">
          <Image
            src={"/images/ic-byeoldol-face.svg"}
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image
            src={"/images/ic-letter.svg"}
            alt="편지"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div className="flex">
        <Txt size={18} weight="cm" className="text-green-49d mb-1">
          To. {writer}
        </Txt>
      </div>

      <div className="flex">
        <Txt size={12} weight="cm" className="text-blue-9a0 mb-4">
          {createDt}
        </Txt>
      </div>

      {/* 편지 본문 */}
      <div className="flex">
        <Txt
          size={15}
          weight="cm"
          align="left"
          className="leading-relaxed whitespace-pre-line mb-6"
        >
          {content}
        </Txt>
      </div>

      {/* 비디오 썸네일 */}
      {/* <div className="w-full h-[120px] bg-gray-200 flex items-center justify-center rounded-md mb-6">
        <Image
          src={fileUrl}
          alt="재생 버튼"
          width={40}
          height={40}
        />
      </div> */}

      {/* 발신자 */}
      <Txt
        size={18}
        weight="cm"
        className="flex justify-end text-green-49d mb-1"
      >
        From. {writer}
      </Txt>
    </div>
  );
}
