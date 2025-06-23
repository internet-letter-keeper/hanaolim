import { ERROR_MESSAGES } from "@/constants/errorMessages";
import { auth } from "@/lib/auth";

/**
 * 세션을 체크하는 유틸리티 함수
 * @return session
 */
export const requireAuth = async () => {
  const session = await auth();
  if (!session?.user.userId) {
    throw new Error(ERROR_MESSAGES.AUTH.LOGIN_REQUIRED);
  }
  return session;
};

/**
 * 8자리 랜덤 코드 생성 (숫자 + 영어 대문자)
 * @returns 8자리 랜덤 코드
 */
export const generateRandomCode = () => {
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const allChars = numbers + letters;

  let result = "";
  for (let i = 0; i < 8; i++) {
    result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return result;
};
