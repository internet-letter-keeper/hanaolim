"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { checkPasswordValidation } from "@/lib/validations/validation";

export default function MyPwdPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isAllFieldsFilled = !!(
    currentPassword &&
    newPassword &&
    confirmPassword
  );
  const newPasswordValidation = checkPasswordValidation(newPassword);

  // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
  const isPasswordMatch = newPassword === confirmPassword;

  const errorMessage = !isAllFieldsFilled
    ? ""
    : !newPasswordValidation.valid
      ? newPasswordValidation.message
      : !isPasswordMatch
        ? "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다."
        : "";

  const isButtonEnabled =
    isAllFieldsFilled && newPasswordValidation.valid && isPasswordMatch;

  // TODO: 비밀번호 변경 API 호출
  const changePassword = async () => {
    // 현재 비밀번호 일치하는지 확인
    // 새 비밀번호 변경
    router.push("/my");
  };

  return (
    <div className="flex flex-col">
      <BasicHeader title="비밀번호 변경" />
      <div className="flex flex-col gap-4 mt-20 px-4">
        <Txt size={19} weight="cm" align="left" className="mt-4">
          현재 비밀번호
        </Txt>
        <Input
          placeholder="영문자,숫자,특수문자를 포함한 8~20자"
          maxLength={20}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          type="password"
        />
        <Txt size={19} weight="cm" align="left" className="mt-4">
          새 비밀번호
        </Txt>
        <Input
          placeholder="영문자,숫자,특수문자를 포함한 8~20자"
          maxLength={20}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
        />
        <Txt size={19} weight="cm" align="left" className="mt-4">
          새 비밀번호 확인
        </Txt>
        <Input
          placeholder="영문자,숫자,특수문자를 포함한 8~20자"
          maxLength={20}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
        />

        <div style={{ minHeight: 22 }}>
          {errorMessage && (
            <Txt size={12} align="left" className="text-red-a76">
              {errorMessage}
            </Txt>
          )}
        </div>

        <PrimaryButton
          title={"변경"}
          textSize={20}
          weight="medium"
          className="h-[38px] mt-[38px]"
          disabled={!isButtonEnabled}
          onClick={changePassword}
        />
      </div>
    </div>
  );
}
