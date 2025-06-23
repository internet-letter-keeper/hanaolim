import {
  getProfileInfo,
  getAccountInfo,
} from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import HomePage from "./homepage";

export default async function Page() {
  const session = await requireAuth(); // 서버에서 세션 인증
  const userId = session.user.userId;

  const [
    { userName, startDate, endDate },
    { accountNum, accountBalance, savingsBalance },
  ] = await Promise.all([
    getProfileInfo(userId),
    getAccountInfo(userId),
  ]);

  return (
    <HomePage
      userName={userName}
      startDate={startDate}
      endDate={endDate}
      accountNum={accountNum}
      accountBalance={accountBalance}
      savingsBalance={savingsBalance}
    />
  );
}
