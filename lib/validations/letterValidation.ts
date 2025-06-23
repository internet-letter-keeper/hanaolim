import { z } from "zod";

// 편지 작성용 validation
export const letterValidator = z.object({
  nickname: z
    .string()
    .min(1, "닉네임을 입력해주세요.")
    .max(7, "닉네임은 7자 이하여야 합니다.")
    .optional(),
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(500, "내용은 500자 이하여야 합니다."),
  iconId: z.coerce.number().optional(),
  fileUrl: z.string().optional(),
  soldierId: z.string().min(1, "군인 ID가 필요합니다."),
  parentLetterId: z.string().optional(), // 답장인 경우
});

export type LetterFormData = z.infer<typeof letterValidator>;
