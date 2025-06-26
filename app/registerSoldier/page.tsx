"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import DatePicker from "@/components/common/DatePicker";
import { postSoldier } from "@/lib/actions/auth-actions";
import { toKoreaTime } from "@/utils/date";

export default function SignInPage() {
  const { data: session, update } = useSession();

  const router = useRouter();
  const [joinDate, setJoinDate] = useState<Date | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setErrorMessage("전역일은 입대일 이후여야 합니다.");
      return;
    }
    if (!accountNumber || accountNumber.length < 16) {
      setErrorMessage("계좌번호를 올바르게 입력하여 주세요");
      return;
    }
    // 유효성 통과 후 처리
    if (session?.user.userId === undefined) {
      setErrorMessage("유효한 사용자 정보가 없습니다.");
      return;
    }
    setIsLoading(true);
    const result = await postSoldier({
      userId: session?.user.userId,
      startDate: toKoreaTime(joinDate),
      endDate: toKoreaTime(releaseDate),
      accountNumber: accountNumber,
    });
    if (result.ok) {
      setErrorMessage(""); // 에러 초기화
      setJoinDate(null);
      setReleaseDate(null);

      await update({
        ...session.user,
        soldier: result.data,
        isSoldier: true,
      }); // 세션 업데이트

      setIsLoading(false);
      router.back();
    } else {
      setIsLoading(false);
      router.push("/auth/error?type=regist");
      return;
    }
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ""); // 숫자만 남김
    let formatted = "";

    if (raw.length <= 3) {
      formatted = raw;
    } else if (raw.length <= 9) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 9)}-${raw.slice(9, 14)}`;
    }

    setAccountNumber(formatted);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-[20px]">
      {/* 하나 올림 로고 */}
      <Image
        src="/icons/ic-hanaolim.svg"
        alt="하나올림 로고"
        width={184}
        height={49}
      />
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
            maxLength={16}
            onChange={handleAccountChange}
            value={accountNumber}
            onKeyDown={handleKeyDown}
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
          disabled={isLoading}
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
