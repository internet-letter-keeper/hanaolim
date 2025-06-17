"use client";

import Image from "next/image";
import { useState } from "react";
import { Txt } from "@/components/atoms";
import { NewIcon } from "../common";

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
    <div className="flex flex-col items-center relative px-10">
      {/* 관물대 첫 페이지면 이전 페이지 버튼이 안 보이게 */}
      {currentPage > 1 ? (
        <button onClick={toPrevCabinet}>
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 이전 페이지로"
            width={20}
            height={20}
            className="absolute w-[5%] scale-x-[-1] left-0 top-[45%]"
          />
        </button>
      ) : (
        <div />
      )}

      <div className="relative w-full">
        <Image
          src="/images/cabinet.svg"
          alt="관물대 이미지"
          layout="responsive"
          width={10}
          height={10}
        />

        <Image
          src="/images/cabinet-byeoldol-face-blackhat.svg"
          alt="별돌이 얼굴 이미지"
          width={67}
          height={67}
          className="absolute w-[24%] top-[6%] left-[51%]"
        />
        <Txt
          weight="medium"
          className="absolute top-[16%] left-[64%] text-white"
        >
          정소은
        </Txt>
        <NewIcon className="absolute top-[6%] left-[52%] text-white" />
        <Image
          src="/images/cabinet-helmet.svg"
          alt="군모 이미지"
          width={67}
          height={67}
          className="absolute w-[24%] top-[9%] left-[30%]"
        />

        <Txt
          weight="medium"
          className="absolute top-[16%] left-[40%] text-white truncate max-w-[7ch]"
        >
          윤서연가나다라
        </Txt>

        <button onClick={() => alert("편지 오픈")} className="cursor-pointer">
          <Image
            src="/images/cabinet-bag.svg"
            alt="가방 이미지"
            width={67}
            height={67}
            className="absolute w-[24%] top-[7%] left-[8%]"
          />
          <Txt
            weight="medium"
            className="absolute top-[8%] left-[21%] text-white truncate max-w-[7ch]"
          >
            최수빈가
          </Txt>
        </button>

        <Image
          src="/images/cabinet-keyring.svg"
          alt="군번줄 이미지"
          width={67}
          height={67}
          className="absolute w-[24%] top-[25%] left-[18%]"
        />
        <Txt
          weight="medium"
          className="absolute w-[24%] z-10 top-[35%] left-[20%] text-white"
        >
          우재현
        </Txt>

        <Image
          src="/images/cabinet-vest.svg"
          alt="조끼 이미지"
          width={67}
          height={67}
          className="absolute w-[24%] top-[50%] left-[8%]"
        />
        <Txt
          weight="medium"
          className="absolute z-10 top-[60%] left-[20%] text-white"
        >
          우재현
        </Txt>

        <Image
          src="/images/cabinet-shoes.svg"
          alt="군화 이미지"
          width={67}
          height={67}
          className="absolute w-[24%] top-[78%] left-[13%]"
        />
        <Txt
          weight="medium"
          className="absolute z-10 top-[67%] left-[60%] text-white"
        >
          임아현
        </Txt>

        <Image
          src="/images/cabinet-gun.svg"
          alt="총 이미지"
          width={67}
          height={67}
          className="absolute w-[40%] top-[62%] left-[37%]"
        />

        <Txt
          weight="medium"
          className="absolute z-10 top-[85%] left-[25%] text-white text-md"
        >
          윤서연
        </Txt>
      </div>

      {/* 관물대 마지막 페이지면 다음 페이지 버튼이 안 보이게 */}
      {currentPage < totalPage && (
        <button onClick={toNextCabinet}>
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 다음 페이지로"
            width={20}
            height={20}
            className="absolute w-[5%] right-0 top-[45%]"
          />
        </button>
      )}

      {/* 페이지네이션 */}
      <div className="bg-white-2f2 rounded-[5px] px-[15px]">
        <Txt className="text-blue-9a0" weight="medium" size={12}>
          {currentPage}/{totalPage}
        </Txt>
      </div>
    </div>
  );
}
