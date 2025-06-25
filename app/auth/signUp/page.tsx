"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, KeyboardEvent } from "react";
import SignUpInput from "@/components/SignUpInput";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { isEmailDuplicated, postSignUp } from "@/lib/actions/auth-actions";
import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordValidation,
} from "@/lib/validations/validation";

export default function SignUpPage() {
  const router = useRouter();

  const goToSignIn = () => {
    router.push("/auth/signIn");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

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
    isPasswordMatch;

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp = async () => {
    // 이름 유효성 검사
    const nameValidation = checkNameValidation(name);
    if (nameValidation.valid) {
      setNameError(false);
      setNameMessage("");
    } else {
      setNameError(false);
      setNameError(true);
      setNameMessage(nameValidation["message"]);
      return;
    }

    // 이메일 유효성 검사
    if (checkEmailValidation(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return;
    }

    setSignUpError("");
    // 회원가입 api 호출
    const duplicated = await isEmailDuplicated(email);
    if (duplicated) {
      setSignUpError("이미 사용 중인 이메일입니다.");
      return;
    }
    const result = await postSignUp({
      email,
      userName: name,
      password: password || "",
    });
    if (result.ok) {
      router.push("/auth/signIn");
    } else {
      setSignUpError(result.error || "회원가입에 실패했습니다.");
      return;
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && isButtonEnabled) {
      handleSignUp();
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
            setSignUpError("");
          }}
          onFocus={() => setSignUpError("")}
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
            setSignUpError("");
          }}
          onFocus={() => setSignUpError("")}
          placeholder="이메일을 입력해주세요"
          maxLength={30}
          error={emailError}
          errorMessage="유효하지 않은 이메일 형식입니다."
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
      {signUpError && (
        <Txt size={12} align="left" className="text-red-a76 w-full mt-2">
          {signUpError}
        </Txt>
      )}
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
