"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import DatePicker from "@/components/common/DatePicker";

export default function MySoldierPage() {
  const router = useRouter();
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled = joinDate !== null && releaseDate !== null;

  const handleSubmit = async () => {
    if (!joinDate) {
      setErrorMessage("입대일을 선택하여 주세요");
      return;
    }

    if (!releaseDate) {
      setErrorMessage("전역일을 선택하여 주세요");
      return;
    }

    if (joinDate >= releaseDate) {
      setErrorMessage("입대일은 전역일보다 빨라야 합니다");
      return;
    }

    setErrorMessage("");
    router.push("/my");
  };

  return (
    <div>
      <BasicHeader title="입대/전역일 변경" />
      <div className="mt-50 flex flex-col gap-5 px-5">
        {/* 입대일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4">
            입대일
          </Txt>
          {/* TODO: 입대일 기본값 설정 */}
          <DatePicker onChange={(date) => setJoinDate(date)} />
        </div>
        {/* 전역일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            전역일
          </Txt>
          {/* TODO: 전역일 기본값 설정 */}
          <DatePicker onChange={(date) => setReleaseDate(date)} />
        </div>
        {/* 에러메세지 + 변경버튼 */}
        <div className="mt-[30px] flex flex-col items-center">
          <div
            style={{ minHeight: 22 }}
            className="flex justify-center items-center mb-[10px]"
          >
            {errorMessage && (
              <Txt size={12} className="text-red-a76">
                {errorMessage}
              </Txt>
            )}
          </div>
          <PrimaryButton
            title={"변경"}
            textSize={20}
            weight="medium"
            className="h-[38px]"
            disabled={!isButtonEnabled}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
