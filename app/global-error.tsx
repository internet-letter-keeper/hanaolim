"use client";

import Image from "next/image";
import { Txt } from "@/components/atoms";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center gap-4 px-6">
      <br />
      <br />

      <Image
        src="/images/byeoldol-error.svg"
        alt="매우 놀란 비상 별돌이 이미지"
        width={100}
        height={100}
      />
      <Txt size={60} weight="heavy" className="text-red-a76">
        ERROR
      </Txt>
      <Txt size={22} weight="bold">
        <br />
        에러가 발생했습니다.
      </Txt>
      <br />
      <br />
      <br />
      <br />
      <Txt size={15} weight="medium" className="text-red-a76 mt-15">
        요청하신 페이지를 처리 중에 오류가 발생했습니다.
        <br />
        서비스 이용에 불편을 드려 죄송합니다.
        <br />
        <br />
        다시 시도해 주시기 바랍니다.
      </Txt>
    </div>
  );
}
