"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, KeyboardEvent } from "react";
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

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  // 회원가입 버튼 클릭 핸들러
  const handleSignUp = async () => {
    // 이름 유효성 검사
    const nameValidation = checkNameValidation(nameRef.current?.value || "");
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
    if (checkEmailValidation(emailRef.current?.value || "")) {
      setEmailError(false);
    } else {
      setEmailError(true);
      return;
    }

    // 회원가입 api 호출

    const duplicated = await isEmailDuplicated(emailRef.current?.value || "");
    if (duplicated) {
      alert("이미 사용 중인 이메일입니다.");
      return;
    }
    const result = await postSignUp({
      email: emailRef.current?.value || "",
      userName: nameRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });
    if (result.ok) {
      alert("회원가입 완료!");
      router.push("/auth/signIn");
    } else {
      alert(result.error);
      return;
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
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
        <div className="flex flex-col gap-[14px]">
          <Txt size={19} weight="cm" align="left">
            이름
          </Txt>
          <div className="flex flex-col gap-[10px]">
            <Input
              placeholder="이름을 입력해주세요"
              maxLength={8}
              customRef={nameRef}
            />
            {nameError && (
              <Txt size={12} align="left" className="text-red-a76 ">
                {nameMessage}
              </Txt>
            )}
          </div>
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-[14px]">
          <Txt size={19} weight="cm" align="left">
            이메일
          </Txt>
          <div className="flex flex-col gap-[10px]">
            <Input
              placeholder="이메일을 입력해주세요"
              maxLength={30}
              customRef={emailRef}
            />
            {emailError && (
              <Txt size={12} align="left" className="text-red-a76 ">
                유효하지 않은 이메일 형식입니다.
              </Txt>
            )}
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-[14px]">
          <Txt size={19} weight="cm" align="left">
            비밀번호
          </Txt>
          <div className="flex flex-col gap-[10px]">
            <Input
              placeholder="영문자,숫자,특수문자를 포함한 8~20자"
              maxLength={20}
              customRef={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErrorMessage && (
              <Txt size={12} align="left" className="text-red-a76 ">
                {passwordErrorMessage}
              </Txt>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Input
              placeholder="비밀번호를 확인해주세요"
              maxLength={20}
              customRef={confirmPasswordRef}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {confirmPasswordErrorMessage && (
              <Txt size={12} align="left" className="text-red-a76 ">
                {confirmPasswordErrorMessage}
              </Txt>
            )}
          </div>
        </div>
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
