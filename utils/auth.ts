import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * 세션을 체크하고 사용자 ID를 반환하는 유틸리티 함수
 */
export const requireAuth = async () => {
  const session = await auth();
  const route = useRouter();
  if (!session?.user.userId) {
    route.push("/auth/signIn");
  }
};
