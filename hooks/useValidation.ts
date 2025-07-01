import { useState } from "react";
import {
  checkEmailValidation,
  checkNameValidation,
  checkPasswordValidation,
} from "@/lib/validations/authValidation";

export default function useValidation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    field: keyof typeof form,
    value: string,
    duplicated: boolean = false
  ) => {
    // form을 업데이트 (순수 함수)
    setForm((prev) => ({ ...prev, [field]: value }));
    // 이름
    if (field === "name") {
      const nameValidation = checkNameValidation(value);

      if (!nameValidation.valid) {
        setErrors((prev) => ({
          ...prev,
          name: nameValidation.valid ? "" : nameValidation.message,
        }));
      } else setErrors((prev) => ({ ...prev, name: "" }));

      // 이메일
    } else if (field === "email") {
      // 중복된 이메일인지 확인
      if (duplicated) {
        setErrors((prev) => ({
          ...prev,
          email: "이미 사용 중인 이메일입니다.",
        }));
      } else {
        // 이메일 형식 검증
        if (!checkEmailValidation(value)) {
          setErrors((prev) => ({
            ...prev,
            email: checkEmailValidation(value)
              ? ""
              : "이메일 형식이 올바르지 않습니다.",
          }));
        } else setErrors((prev) => ({ ...prev, email: "" }));
      }

      // 패스워드
    } else if (field === "password") {
      const passwordValidation = checkPasswordValidation(value);

      if (!passwordValidation.valid) {
        setErrors((prev) => ({
          ...prev,
          password: passwordValidation.valid ? "" : passwordValidation.message,
        }));
      } else setErrors((prev) => ({ ...prev, password: "" }));

      // 비밀번호 확인
    } else if (field === "confirmPassword") {
      if (value !== form.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "입력하신 비밀번호와 다릅니다.",
        }));
      } else setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  return { form, errors, handleChange };
}
