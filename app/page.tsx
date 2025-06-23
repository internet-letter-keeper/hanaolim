import { getProfileInfo } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import HomePage from "./homepage";

export default async function Page() {
  const session = await requireAuth(); // 서버에서 세션 인증
  const { userName, startDate, endDate } = await getProfileInfo(
    session.user.userId
  );

  return (
    <HomePage userName={userName} startDate={startDate} endDate={endDate} />
  );
}
