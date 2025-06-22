import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 8자리 랜덤 코드 생성 (숫자 + 영어 대문자)
 * @returns 8자리 랜덤 코드
 */
export function generateRandomCode(): string {
  const numbers = "0123456789";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allChars = numbers + letters;

  let result = "";
  for (let i = 0; i < 8; i++) {
    result += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }

  return result;
}
