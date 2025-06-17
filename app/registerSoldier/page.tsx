"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import DatePicker from "@/components/common/DatePicker";
import hanaOlim from "@/public/images/ic-hanaolim-logo.svg";

export default function SignInPage() {
  const router = useRouter();
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const accountRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!joinDate) {
      setErrorMessage("입대일을 선택하여 주세요");
      return;
    }

    if (!releaseDate) {
      setErrorMessage("전역일을 선택하여 주세요");
      return;
    }

    if (!accountRef.current?.value) {
      setErrorMessage("계좌번호를 입력하여 주세요");
      return;
    }

    // 유효성 통과 후 처리
    setErrorMessage(""); // 에러 초기화
    setJoinDate(null);
    setReleaseDate(null);
    alert("등록이 완료되었습니다!");
    router.push("/");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full px-[20px]">
      {/* 하나 올림 로고 */}
      <Image src={hanaOlim} alt="하나올림 로고" width={184} height={49} />
      {/* 입대일, 전역일, 계좌번호 */}
      <div className="mt-[42px] flex flex-col gap-[16px] w-full">
        {/* 입대일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4">
            입대일
          </Txt>
          <DatePicker onChange={(date) => setJoinDate(date)} />
        </div>

        {/* 전역일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            전역일
          </Txt>
          <DatePicker onChange={(date) => setReleaseDate(date)} />
        </div>

        {/* 계좌번호 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            계좌번호
          </Txt>
          <Input
            placeholder="000-000000-00000"
            maxLength={20}
            customRef={accountRef}
          />
        </div>
      </div>

      {/* 에러메세지 + 등록완료 */}
      <div className="mt-[30px] w-full">
        {errorMessage && (
          <div className="flex justify-center items-center mb-[10px]">
            <Txt size={12} className="text-red-a76">
              {errorMessage}
            </Txt>
          </div>
        )}

        <PrimaryButton
          title="등록 완료"
          rounded="sm"
          textSize={16}
          align="center"
          weight="cm"
          className="h-[38px]"
          onClick={handleSubmit}
        />
      </div>
      <button onClick={() => router.back()} className="mt-[20px]">
        <Txt
          size={12}
          className="text-gray-353 underline underline-offset-auto cursor-pointer"
        >
          취소
        </Txt>
      </button>
    </div>
  );
}
