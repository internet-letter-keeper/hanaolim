"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import SignUpInput from "@/components/SignUpInput";
import { PrimaryButton, Txt } from "@/components/atoms";
import { signUpHook } from "@/hooks/useAuth";
import useValidation from "@/hooks/useValidation";
import { isEmailDuplicated } from "@/lib/actions/auth-actions";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);

  const { form, errors, handleChange } = useValidation();

  const isAllFieldsFilled = Object.values(form).every(Boolean);
  //버튼 활성화
  const isButtonEnabled =
    isAllFieldsFilled &&
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !isLoading;

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp = async () => {
    setIsLoading(true);

    const duplicated = await isEmailDuplicated(form.email);
    if (duplicated) {
      handleChange("email", form.email, true);
      setIsLoading(false);
      return;
    }
    const result = await signUpHook({
      name: form.name,
      email: form.email,
      password: form.password,
      callbackUrl,
    });
    if (result?.success) {
      setIsLoading(false);
      router.push(result.redirectUrl || "/onboarding");
    } else {
      setIsLoading(false);
      router.push("/auth/error?type=signup");
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && isButtonEnabled) {
      handleSignUp();
    }
  };

  const goToSignIn = () => {
    if (callbackUrl && callbackUrl !== "/") {
      router.push(
        `/auth/signIn?callbackUrl=${encodeURIComponent(callbackUrl)}`
      );
    } else {
      router.push("/auth/signIn");
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

      {/* Input 버튼 */}
      <div className="mt-[52px] flex flex-col gap-[17px] w-full">
        {/* 이름 */}
        <SignUpInput
          label="이름"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="이름을 입력해주세요"
          maxLength={8}
          error={!!errors.name}
          errorMessage={errors.name}
        />
        {/* 이메일 */}
        <SignUpInput
          label="이메일"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="이메일을 입력해주세요"
          maxLength={30}
          error={!!errors.email}
          errorMessage={errors.email}
        />
        {/* 비밀번호 */}
        <SignUpInput
          label="비밀번호"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="영문자,숫자,특수문자를 포함한 8~20자"
          maxLength={20}
          error={!!errors.password}
          errorMessage={errors.password}
          type="password"
        />
        <SignUpInput
          label="비밀번호 확인"
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="비밀번호를 확인해주세요"
          maxLength={20}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          type="password"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 회원가입 버튼 */}
      <PrimaryButton
        title="회원가입"
        className="mt-[38px]"
        onClick={handleSignUp}
        disabled={!isButtonEnabled}
      />

      {/* 로그인 안내 */}
      <div className="flex items-center mt-[21px]">
        <Txt size={12} className="text-black-353">
          가입한 계정이 이미 있으신가요?
        </Txt>
        <button onClick={goToSignIn} className="ml-[14px] mb-1">
          <Txt
            size={12}
            className="text-black-353 underline underline-offset-auto"
          >
            로그인
          </Txt>
        </button>
      </div>
    </div>
  );
}
