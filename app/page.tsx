import {
  getEarnedPoint,
  getLetterCount,
  getSoldierInfoByUserId,
} from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import HomePage from "./homepage";

export default async function Page() {
  const session = await requireAuth(); // 서버에서 세션 인증
  const userId = session.user.userId;

  const [
    { letterExp },
    { unreadCount, totalCount },
    { soldierId },
  ] = await Promise.all([
    getEarnedPoint(userId),
    getLetterCount(userId),
    getSoldierInfoByUserId(userId),
  ]);

  return (
    <HomePage
      letterExp={letterExp}
      unreadLetter={unreadCount}
      totalCount={totalCount}
      soldierId={soldierId}
    />
  );
}
