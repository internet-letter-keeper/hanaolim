import { getProfileInfo } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import HomePage from "./homepage";

export default async function Page() {
  const session = await requireAuth(); // 서버에서 세션 인증
  const userName = await getProfileInfo(session.user.userId); // 서버에서 유저 이름 조회

  return <HomePage userName={userName} />;
}
