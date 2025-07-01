import { z } from "zod";

// 이름 검증 스키마
const nameSchema = z
  .string()
  .min(2, "한글 2글자 이상 8자 이하로 입력해주세요.")
  .max(8, "한글 2글자 이상 8자 이하로 입력해주세요.")
  .regex(
    /^[가-힣]+$/,
    "영어, 숫자, 특수문자, 독립된 자음/모음 사용 불가합니다"
  );

// 이메일 검증
const emailSchema = z.string().email("유효한 이메일 형식이 아닙니다.");

// 비밀번호 검증
const passwordSchema = z
  .string()
  .min(8, "비밀번호의 길이가 8자 이상이어야 합니다.")
  .max(20, "비밀번호의 길이가 20자 이하여야 합니다.")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    "영문자, 숫자, 특수문자를 모두 포함해야 합니다."
  );

export const credentialValidator = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입용
export const signUpValidator = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "입력하신 비밀번호와 다릅니다.",
    path: ["confirmPassword"],
  });

// 비밀번호 변경용
export const changePasswordValidator = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const checkNameValidation = (name: string) => {
  const result = nameSchema.safeParse(name);
  return {
    valid: result.success,
    message: result.success ? "" : result.error.errors[0]?.message || "",
  };
};

export const checkEmailValidation = (email: string) => {
  const result = emailSchema.safeParse(email);
  return result.success;
};

export const checkPasswordValidation = (password: string) => {
  const result = passwordSchema.safeParse(password);
  return {
    valid: result.success,
    message: result.success ? "" : result.error.errors[0]?.message || "",
  };
};
