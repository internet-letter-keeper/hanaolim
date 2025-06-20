import { z } from "zod";

const passwordLogic = z
  .string()
  .min(8, "비밀번호의 길이가 8자 이상이어야 합니다.")
  .max(20, "비밀번호의 길이가 20자 이하여야 합니다.")
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    "영문자, 숫자, 특수문자를 모두 포함해야 합니다."
  );

export const credentialValidator = z.object({
  email: z.string().email("유효한 이메일 형식이 아닙니다."),
  password: passwordLogic,
});
