"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState, KeyboardEvent } from "react";
import SplashScreen from "@/components/HomeSplashScreen";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import { getUserByEmail } from "@/lib/actions/auth-actions";
import { postFriendbyId } from "@/lib/actions/friend-actions";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [snslogin, setSnsLogin] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const goToSignUp = () => {
    if (callbackUrl && callbackUrl !== "/") {
      router.push(
        `/auth/signUp?callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
    } else {
      router.push("/auth/signUp");
    }
  };

  //스플래시 화면 구현하기
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const alreadySeen = document.cookie.includes("splashSeen=true");

    if (!alreadySeen) {
      setShowSplash(true);
    } else {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (snslogin) {
      if (callbackUrl && callbackUrl !== "/") {
        setIsLoading(false);
        router.push(`${callbackUrl}?add=true`);
      } else {
        setIsLoading(false);
        router.push("/onboarding");
      }
    }
  }, [snslogin]);

  //splash 렌더 (브라우저 종료 시 쿠키 사라짐)
  let splashContent = null;

  if (showSplash === null) {
    return null;
  } else if (showSplash) {
    splashContent = (
      <SplashScreen
        onFinish={() => {
          document.cookie = "splashSeen=true; path=/;";
          setShowSplash(false);
        }}
      />
    );
  }

  if (splashContent) {
    return <div className="relative w-full h-screen">{splashContent}</div>;
  }

  // 로그인 버튼 클릭 핸들러
  const handleSignIn = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // 로그인 정보 오류
    if (result?.error === "CredentialsSignin") {
      setErrorMessage("이메일 또는 비밀번호가 잘못되었습니다.");
      setIsLoading(false);
      return;
      // 로그인 성공
    } else if (result?.ok) {
      if (callbackUrl && callbackUrl !== "/") {
        const user = await getUserByEmail(email);
        await postFriendbyId(
          Number(callbackUrl.split("/").pop()),
          Number(user?.userId)
        );
        setIsLoading(false);
        router.push(callbackUrl);
      } else {
        setIsLoading(false);
        router.push("/onboarding");
      }
      // 로그인 에러
    } else {
      setIsLoading(false);
      router.push("/auth/error?type=signin");
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  const snsButtonAction = async (provider: string) => {
    setIsLoading(true);
    const result = await signIn(provider, {
      redirect: false,
    });
    if (result.ok) {
      setSnsLogin(true);
    } else {
      setIsLoading(false);
      router.push("/auth/error?type=signin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-1 h-full px-[20px] relative">
      {/* 하나 올림 로고 */}
      <Image
        src="/icons/ic-hanaolim.svg"
        alt="하나올림 로고"
        width={184}
        height={49}
      />

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
            maxLength={30}
            customRef={emailRef}
          />
        </div>

        {/* 비밀번호 */}
        <div className="flex mt-4 justify-between items-center mb-[21px]">
          <Txt size={19} weight="cm" align="left" className="min-w-1/4 ">
            비밀번호
          </Txt>
          <Input
            placeholder="비밀번호를 입력해주세요"
            maxLength={20}
            customRef={passwordRef}
            type="password"
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* 로그인 에러 메시지 */}
        {errorMessage && (
          <Txt
            size={12}
            align="center"
            className={`text-red-a76 w-full mb-[15px]`}
          >
            {errorMessage}
          </Txt>
        )}

        {/* 로그인 버튼 */}
        <PrimaryButton
          title={isLoading ? "로그인 중..." : "로그인"}
          rounded="sm"
          textSize={16}
          align="center"
          weight="cm"
          className="h-[38px] "
          disabled={isLoading}
          onClick={handleSignIn}
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
        <button
          onClick={() => snsButtonAction("naver")}
          className="cursor-pointer"
          disabled={isLoading}
        >
          <Image
            className="w-full h-full"
            alt="naverImage"
            src="/icons/ic-naver.svg"
            width={45}
            height={45}
          />
        </button>

        <button
          onClick={() => snsButtonAction("kakao")}
          className="cursor-pointer"
          disabled={isLoading}
        >
          <Image
            className="w-full h-full"
            alt="kakaoImage"
            src="/icons/ic-kakao.svg"
            width={45}
            height={45}
          />
        </button>

        <button
          onClick={() => snsButtonAction("google")}
          className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center cursor-pointer"
          disabled={isLoading}
        >
          <Image
            className="w-[28px] h-[28px]"
            alt="googleImage"
            src="/icons/ic-google.svg"
            width={28}
            height={28}
          />
        </button>
      </div>

      {/* 회원가입 안내 */}
      <div className="flex items-center mt-[45px]">
        <Txt size={12} className="text-gray-353">
          가입한 계정이 없으신가요?
        </Txt>
        <button onClick={goToSignUp} className="ml-[14px] mb-1">
          <Txt
            size={12}
            className="text-gray-353 underline underline-offset-auto"
          >
            회원가입
          </Txt>
        </button>
      </div>
    </div>
  );
}
