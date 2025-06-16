"use client";

import Image from "next/image";
import { useState } from "react";
import { Txt } from "@/components/atoms";

type Props = {
  isMyCabinet: boolean;
};

export default function Cabinet({ isMyCabinet }: Props) {
  // TODO: 내 캐비넷일 때만 편지 열람 가능하도록

  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = 6;

  const toPrevCabinet = () => setCurrentPage((prev) => prev - 1);

  const toNextCabinet = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="flex flex-col items-center relative mb-[14px]">
      {/* FIXME: 첫, 마지막 페이지에서 레이아웃 전체적으로 위로 올라가는 현상 수정. absolute 때문에 그런 듯함 */}

      {/* 관물대 첫 페이지면 이전 페이지 버튼이 안 보이게 */}
      {currentPage > 1 && (
        <button onClick={toPrevCabinet} className="cursor-pointer">
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 이전 페이지로"
            width={20}
            height={20}
            className="scale-x-[-1] left-0 absolute top-1/2"
          />
        </button>
      )}

      {/* TODO: 관물대에 아이템 넣기 구현 */}
      <Image
        src="/images/img-cabinet.svg"
        alt="관물대 이미지"
        width={270}
        height={470}
      />

      {/* 관물대 마지막 페이지면 다음 페이지 버튼이 안 보이게 */}
      {currentPage < totalPage && (
        <button onClick={toNextCabinet} className="cursor-pointer">
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 다음 페이지로"
            width={20}
            height={20}
            className="absolute right-0 top-1/2"
          />
        </button>
      )}

      {/* 페이지네이션 */}
      <div className="bg-white-2f2 rounded-[5px] px-[15px] mt-[14px]">
        <Txt className="text-blue-9a0" weight="medium" size={12}>
          {currentPage}/{totalPage}
        </Txt>
      </div>
    </div>
  );
}
