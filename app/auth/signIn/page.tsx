"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import icGoogle from "@/public/icons/ic-google.svg";
import icKakao from "@/public/icons/ic-kakao.svg";
import icNaver from "@/public/icons/ic-naver.svg";
import hanaOlim from "@/public/images/ic-hanaolim-logo.svg";

export default function SignInPage() {
  const isLoginError = false; // 로그인 에러 여부

  const router = useRouter();

  const goToSignUp = () => router.push("/auth/signUp");

  return (
    <div className="flex flex-col items-center justify-center gap-1 h-full px-[20px]">
      {/* 하나 올림 로고 */}
      <Image src={hanaOlim} alt="하나올림 로고" width={184} height={49} />

      {/* 통합 로그인 텍스트 */}
      <Txt weight="cm" align="center" className="text-gray-aaa mt-1">
        통합 로그인
      </Txt>

      {/* 이메일, 비밀번호 입력 필드 + 로그인 버튼 + 또는 */}
      <div className="mt-[44px] flex flex-col ">
        {/* 이메일 */}
        <div className="flex justify-between items-center">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4">
            이메일
          </Txt>
          <Input
            placeholder="이메일을 입력해주세요"
            inputType="auth"
            maxLength={30}
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex mt-4 justify-between items-center mb-[21px]">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            비밀번호
          </Txt>
          <Input
            placeholder="비밀번호를 입력해주세요"
            inputType="auth"
            maxLength={20}
          />
        </div>

        {/* 로그인 에러 메시지 */}
        {isLoginError && (
          <Txt size={12} align="center" className="text-red-a76 mb-[15px]">
            이메일 또는 비밀번호를 확인해주세요
          </Txt>
        )}

        {/* 로그인 버튼 */}
        <PrimaryButton
          title="로그인"
          rounded="sm"
          textSize={16}
          align="center"
          weight="cm"
          className="h-[38px] "
        />

        {/* 또는 */}
        <div className="flex items-center gap-2 mt-[16px] w-full h-[21px]">
          <svg width="100%" height="1">
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="var(--color-gray-fdf)"
              strokeWidth="1"
            />
          </svg>
          <Txt size={13} weight="medium" className="text-gray-aaa w-1/2">
            또는
          </Txt>
          <svg width="100%" height="1">
            <line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="var(--color-gray-fdf)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {/* 소셜 로그인 */}
      <div className="flex items-center mt-[17px] gap-4">
        <button>
          <div className="w-[45px] h-[45px]">
            <Image className="w-full h-full" alt="naverImage" src={icNaver} />
          </div>
        </button>

        <button>
          <div className="w-[45px] h-[45px]">
            <Image className="w-full h-full" alt="kakaoImage" src={icKakao} />
          </div>
        </button>

        <button>
          <div className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center">
            <Image
              className="w-[28px] h-[28px]"
              alt="googleImage"
              src={icGoogle}
            />
          </div>
        </button>
      </div>

      {/* 회원가입 안내 */}
      <div className="flex items-center mt-[45px]">
        <Txt size={12} className="not-italic  text-gray-353">
          가입한 계정이 없으신가요?
        </Txt>
        <button onClick={goToSignUp} className="ml-[14px] mb-1">
          <Txt
            size={12}
            className="not-italic  text-gray-353 underline underline-offset-auto"
          >
            회원가입
          </Txt>
        </button>
      </div>
    </div>
  );
}
