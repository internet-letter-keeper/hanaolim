"use server";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { requireAuth } from "@/utils/auth";
import prisma from "../db";
import {
  letterValidator,
  LetterFormData,
} from "../validations/letterValidation";

/**
 * FormData에서 편지 데이터 추출 및 검증
 * @usage 편지쓰기
 * @param formData
 * @returns 검증된 데이터 반환
 * @throw 입력된 정보가 잘못됐을 경우
 */
const extractAndValidateLetterData = async (
  formData: FormData
): Promise<LetterFormData> => {
  const formEntries = Object.fromEntries(formData.entries());

  // fileUrl이 있어야만 할 필요는 없음
  if (formEntries.fileUrl && typeof formEntries.fileUrl !== "string") {
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  const validator = letterValidator.safeParse(formEntries);
  if (!validator.success) {
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
const createLetter = async (data: LetterFormData, senderId?: number) => {
  try {
    const letterData: any = {
      content: data.content,
      fileUrl: data.fileUrl,
    };

    // 일반 편지인 경우 : 군인이 receiver
    if (data.soldierId && !data.parentLetterId) {
      const soldier = await prisma.soldier.findUnique({
        where: { soldierId: +data.soldierId },
        select: { userId: true },
      });
      if (!soldier) {
        throw new Error("해당하는 군인을 찾을 수 없습니다.");
      }

      letterData.nickname = data.nickname;
      if (data.iconId) {
        letterData.iconId = Number(data.iconId);
      }
      letterData.senderId = senderId;
      letterData.receiverId = soldier.userId;
    }

    // 답장인 경우 : 군인이 sender
    if (data.parentLetterId) {
      const soldier = await prisma.soldier.findUnique({
        where: { soldierId: +data.soldierId },
        select: { userId: true },
      });
      if (!soldier) {
        throw new Error("해당하는 군인을 찾을 수 없습니다.");
      }

      letterData.senderId = soldier.userId;
      letterData.receiverId = data.receiverId;
      letterData.parentLetterId = +data.parentLetterId;
    }

    await prisma.letter.create({ data: letterData });

    return { success: true };
  } catch (error) {
    console.error("Letter creation error:", error);
    throw new Error(ERROR_MESSAGES.LETTER.LETTER_POST_FAILED);
  }
};

/**
 * 군인에게 편지를 생성
 * @usage 편지쓰기
 * @param formData
 * @returns createLetter 함수
 * @throw 입력이 잘못되었을 경우
 */
export const postLetter = async (formData: FormData) => {
  const session = await requireAuth();
  const data = await extractAndValidateLetterData(formData);

  if (!data.soldierId) {
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  return createLetter(data, +session.user.userId!);
};

/**
 * 군인이 편지에 대한 답장 생성
 * @usage 편지쓰기
 * @param formData
 * @returns createLetter 함수
 * @throw 입력이 잘못되었을 경우
 */
export const postLetterReply = async (formData: FormData) => {
  const session = await requireAuth();
  const data = await extractAndValidateLetterData(formData);

  if (!data.parentLetterId) {
    throw new Error(ERROR_MESSAGES.LETTER.INVALID_INPUT_DATA);
  }

  return createLetter(data);
};

/**
 * 편지의 sender Name과 ID을 반환하는 api
 * @param letterId 편지 아이디
 * @returns 보낸 사람 정보
 */
export const getSenderName = async (letterId: number) => {
  try {
    const senderId = await prisma.letter.findUnique({
      where: { letterId },
      select: { senderId: true },
    });

    if (!senderId) {
      throw new Error("편지를 찾을 수 없습니다.");
    }

    const senderInfo = await prisma.user.findUnique({
      where: { userId: senderId.senderId },
      select: {
        userId: true,
        userName: true,
      },
    });

    if (!senderInfo) throw new Error("정보를 가져오는데 실패했습니다.");

    return senderInfo;
  } catch (error) {
    throw new Error("정보를 가져오는데 실패했습니다.");
  }
};
