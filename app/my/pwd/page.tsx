"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import {
  verifyCurrentPassword,
  changePassword,
} from "@/lib/actions/auth-actions";
import { checkPasswordValidation } from "@/lib/validations/validation";

export default function MyPwdPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isAllFieldsFilled = !!(
    currentPassword &&
    newPassword &&
    confirmPassword
  );
  const newPasswordValidation = checkPasswordValidation(newPassword);

  // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
  const isPasswordMatch = newPassword === confirmPassword;

  const validationErrorMessage = !isAllFieldsFilled
    ? ""
    : !newPasswordValidation.valid
      ? newPasswordValidation.message
      : !isPasswordMatch
        ? "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다."
        : "";

  const isButtonEnabled =
    isAllFieldsFilled &&
    newPasswordValidation.valid &&
    isPasswordMatch &&
    !isLoading;

  const handleChangePassword = async () => {
    if (!session?.user?.userId) {
      setErrorMessage("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // 현재 비밀번호 일치하는지 확인
      const verifyResult = await verifyCurrentPassword(
        session.user.userId,
        currentPassword
      );

      if (!verifyResult.success) {
        setErrorMessage("비밀번호 확인에 실패했습니다.");
        return;
      }

      if (!verifyResult.isValid) {
        setErrorMessage("현재 비밀번호가 일치하지 않습니다.");
        return;
      }

      // 새 비밀번호 변경
      const changeResult = await changePassword(
        session.user.userId,
        newPassword
      );

      if (!changeResult.success) {
        setErrorMessage("비밀번호 변경에 실패했습니다.");
        return;
      }

      // 성공 시 마이페이지로 이동
      router.push("/my");
    } catch {
      setErrorMessage("비밀번호 변경 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
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
          {(validationErrorMessage || errorMessage) && (
            <Txt size={12} align="left" className="text-red-a76">
              {validationErrorMessage || errorMessage}
            </Txt>
          )}
        </div>

        <PrimaryButton
          title={isLoading ? "변경 중..." : "변경"}
          textSize={20}
          weight="medium"
          className="h-[38px] mt-[38px]"
          disabled={!isButtonEnabled}
          onClick={handleChangePassword}
        />
      </div>
    </div>
  );
}
