import {
  getProfileInfo,
  getAccountInfo,
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
    { userName, startDate, endDate },
    { accountNum, accountBalance, savingsBalance },
    { letterExp },
    { unreadCount },
    { soldierId },
  ] = await Promise.all([
    getProfileInfo(userId),
    getAccountInfo(userId),
    getEarnedPoint(userId),
    getLetterCount(userId),
    getSoldierInfoByUserId(userId),
  ]);

  return (
    <HomePage
      userName={userName}
      startDate={startDate}
      endDate={endDate}
      accountNum={accountNum}
      accountBalance={accountBalance}
      savingsBalance={savingsBalance}
      letterExp={letterExp}
      unreadLetter={unreadCount}
      soldierId={soldierId}
    />
  );
}
