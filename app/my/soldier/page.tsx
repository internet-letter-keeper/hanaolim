"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader, DatePicker } from "@/components/common";
import { updateSoldierDates } from "@/lib/actions/soldier-actions";
import { toKoreaTime } from "@/utils/date";

export default function MySoldierPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { startDate, endDate } = session?.user?.soldier || {};
  const [joinDate, setJoinDate] = useState<Date>(new Date(startDate!));
  const [releaseDate, setReleaseDate] = useState<Date>(new Date(endDate!));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //null값일 경우 버튼 비활성화ㄴ
  const isButtonEnabled =
    joinDate !== null && releaseDate !== null && !isLoading;

  const handleSubmit = async () => {
    if (!session?.user?.soldier?.soldierId) {
      setErrorMessage("유효한 군인 정보가 없습니다.");
      return;
    }

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

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await updateSoldierDates(
        session.user.soldier.soldierId,
        toKoreaTime(joinDate),
        toKoreaTime(releaseDate)
      );

      //성공했을 경우
      if (res.success) {
        await update({
          ...session.user,
          soldier: {
            ...session.user.soldier,
            startDate: joinDate,
            endDate: releaseDate,
          },
        });
        setErrorMessage("");
        router.push("/my");
      } else {
        setErrorMessage(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate) {
      setJoinDate(new Date(startDate));
    }
    if (endDate) {
      setReleaseDate(new Date(endDate));
    }
  }, [startDate, endDate]);

  return (
    <div>
      <BasicHeader title="입대/전역일 변경" />
      <div className="mt-50 flex flex-col gap-5 px-5">
        {/* 입대일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4">
            입대일
          </Txt>
          <DatePicker onChange={(date) => setJoinDate(date)} value={joinDate} />
        </div>
        {/* 전역일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            전역일
          </Txt>
          <DatePicker
            onChange={(date) => setReleaseDate(date)}
            value={releaseDate}
          />
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
            title={isLoading ? "변경 중..." : "변경"}
            disabled={!isButtonEnabled}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
