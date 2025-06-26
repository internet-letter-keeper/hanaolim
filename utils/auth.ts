import { ERROR_MESSAGES } from "@/constants/message";
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
