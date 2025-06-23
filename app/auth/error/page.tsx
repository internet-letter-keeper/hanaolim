"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrimaryButton, Txt } from "@/components/atoms";
import { Button } from "@/components/ui/button";

export default function LoginErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-10 text-center">
      {/* 이미지 */}
      <Image
        src="/images/byeoldol-sad.svg"
        alt="로그인 실패"
        width={200}
        height={200}
        className="mb-6"
      />

      {/* 메시지 */}

      <Txt size={18}>로그인 중 오류가 발생했어요</Txt>

      <Txt size={14} className="text-gray-500 mt-2 mb-4">
        잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요.
      </Txt>

      {/* 홈으로 / 로그인 다시 시도 버튼 */}

      <PrimaryButton
        title="다시 로그인"
        onClick={() => router.push("/auth/signIn")}
        className="mt-4"
      ></PrimaryButton>
    </div>
  );
}
