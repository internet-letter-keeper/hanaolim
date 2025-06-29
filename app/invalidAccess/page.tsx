"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrimaryButton, Txt } from "@/components/atoms";

export default function invalidAccess() {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center gap-4 px-6">
      <Image
        src="/images/byeoldol-sosad.svg"
        alt="매우 슬픈 별돌이 이미지"
        width={100}
        height={100}
      />
      <Txt size={60} weight="heavy" className="text-green-49d">
        403
      </Txt>
      <Txt size={20} weight="bold">
        앗! 접근 권한이 없어요
      </Txt>

      <Txt size={18} weight="medium" className="text-green-49d mt-15">
        요기있는 별돌이가 다시 데려다줄게요!
      </Txt>

      <PrimaryButton
        title="뒤로가기"
        onClick={handleGoBack}
        rounded="sm"
        textSize={16}
        align="center"
        weight="cm"
        className="h-[38px] w-2/3 mt-10"
      />
    </div>
  );
}
