"use server";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { requireAuth } from "@/utils/auth";
import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "../db";
import {
  letterValidator,
  LetterFormData,
} from "../validations/letterValidation";

/**
 * 파일 업로드 처리 함수
 * @usage 편지쓰기
 * @param file 업로드할 파일
 * @returns string public에 업로드 된 파일 명 반환
 */
const uploadFile = async (file: File | null): Promise<string | undefined> => {
  if (!file || !file.size) return undefined;

  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/letters");
  if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);
  return `/letters/${fileName}`;
};

/**
 * FormData에서 편지 데이터 추출 및 검증
 * @usage 편지쓰기
 * @param formData
 * @returns  검증된 데이터 반환
 */
const extractAndValidateLetterData = async (
  formData: FormData
): Promise<LetterFormData> => {
  const file = formData.get("file") as File;
  const fileUrl = await uploadFile(file);

  const formEntries = Object.fromEntries(formData.entries());
  if (fileUrl) {
    formEntries.fileUrl = fileUrl;
  }

  const validator = letterValidator.safeParse(formEntries);
  if (!validator.success) {
    console.error("Validation error:", validator.error);
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  return validator.data;
};

/**
 * 편지 작성 API
 * @usage 편지쓰기
 * @param data 편지 내용
 * @param senderId 보내는 사람의 id
 * @returns 성공했을 경우: success: true
 * @throws "편지 작성에 실패했습니다."
 */
const createLetter = async (data: LetterFormData, senderId: number) => {
  try {
    const letterData: any = {
      content: data.content,
      fileUrl: data.fileUrl,
      senderId,
    };

    // 일반 편지인 경우 : 군인이 receiver
    if (data.soldierId) {
      letterData.nickname = data.nickname;
      letterData.iconId = Number(data.iconId);
      letterData.receiverId = +data.soldierId;
    }

    // 답장인 경우 : 군인이 sender
    if (data.parentLetterId) {
      letterData.receiverId = senderId;
      letterData.senderId = +data.soldierId;
      letterData.parentLetterId = +data.parentLetterId;
    }

    await prisma.letter.create({ data: letterData });
    return { success: true };
  } catch (error) {
    throw new Error(ERROR_MESSAGES.LETTER.LETTER_POST_FAILED);
  }
};
/**
 * 군인에게 편지를 생성
 * @usage 편지쓰기
 * @param formData
 * @returns createLetter 함수
 */
export const postLetter = async (formData: FormData) => {
  const session = await requireAuth();

  const data = await extractAndValidateLetterData(formData);

  // 일반 편지인 경우 필수 필드 검증
  //TODO: 검증 로직 추가
  if (!data.iconId) {
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  return createLetter(data, +session.user.userId!);
};

/**
 * 군인이 편지에 대한 답장 생성
 * @usage 편지쓰기
 * @param formData 편지 데이터
 * @returns createLetter 함수
 */
export const postLetterReply = async (formData: FormData) => {
  const session = await requireAuth();

  const data = await extractAndValidateLetterData(formData);

  // 답장인 경우 필수 필드 검증
  //TODO: 검증 로직 추가
  if (!data.parentLetterId) {
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  return createLetter(data, +session.user.userId!);
};
