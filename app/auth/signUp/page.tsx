"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import SignUpInput from "@/components/SignUpInput";
import { PrimaryButton, Txt } from "@/components/atoms";
import { signUpHook } from "@/hooks/useSign";
import { isEmailDuplicated, postSignUp } from "@/lib/actions/auth-actions";
import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordValidation,
} from "@/lib/validations/validation";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const passwordValidation = checkPasswordValidation(password);
  const isPasswordMatch = password === confirmPassword;
  const passwordErrorMessage = !password
    ? ""
    : !passwordValidation.valid
      ? passwordValidation.message
      : "";
  const confirmPasswordErrorMessage = !confirmPassword
    ? ""
    : !isPasswordMatch
      ? "입력하신 비밀번호와 다릅니다."
      : "";

  const isAllFieldsFilled = !!(name && email && password && confirmPassword);
  //버튼 활성화
  const isButtonEnabled =
    isAllFieldsFilled &&
    checkNameValidation(name).valid &&
    checkEmailValidation(email) &&
    passwordValidation.valid &&
    isPasswordMatch &&
    !isLoading;

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp = async () => {
    setIsLoading(true);

    const duplicated = await isEmailDuplicated(email);
    if (duplicated) {
      setEmailError(true);
      setEmailMessage("이미 사용 중인 이메일입니다.");
      setIsLoading(false);
      return;
    }
    const result = await signUpHook({
      email,
      name,
      password,
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            const validation = checkNameValidation(e.target.value);
            if (validation.valid) {
              setNameError(false);
              setNameMessage("");
            } else {
              setNameError(true);
              setNameMessage(validation.message);
            }
          }}
          placeholder="이름을 입력해주세요"
          maxLength={8}
          error={nameError}
          errorMessage={nameMessage}
        />
        {/* 이메일 */}
        <SignUpInput
          label="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(!checkEmailValidation(e.target.value));
            setEmailMessage("이메일 형식이 올바르지 않습니다.");
          }}
          placeholder="이메일을 입력해주세요"
          maxLength={30}
          error={emailError}
          errorMessage={emailMessage}
        />
        {/* 비밀번호 */}
        <SignUpInput
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="영문자,숫자,특수문자를 포함한 8~20자"
          maxLength={20}
          error={!!passwordErrorMessage}
          errorMessage={passwordErrorMessage}
          type="password"
        />
        <SignUpInput
          label="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 확인해주세요"
          maxLength={20}
          error={!!confirmPasswordErrorMessage}
          errorMessage={confirmPasswordErrorMessage}
          type="password"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 회원가입 버튼 */}
      <PrimaryButton
        title="회원가입"
        rounded="sm"
        textSize={16}
        align="center"
        weight="cm"
        className="h-[38px] mt-[38px]"
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
