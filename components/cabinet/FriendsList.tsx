import { requireAuth } from "@/utils/auth";
import { calculateRankByStartDate } from "@/utils/date";
import { getFriendsList } from "@/lib/actions/friend-actions";
import { AddFriendBtn } from "@/components/cabinet";
import { FriendProfileCircle } from "@/components/common";

type Props = {
  soldierId: number;
};

export default async function FriendsList({ soldierId }: Props) {
  const session = await requireAuth();

  const myProfile = session?.user.isSoldier
    ? {
        soldierId: session.user.soldier.soldierId!,
        userName: session.user.userName!,
        endDate: session.user.soldier.endDate!,
        rank: calculateRankByStartDate(
          new Date(session.user.soldier.startDate!)
        ),
      }
    : null;

  const friendsList = await getFriendsList(session.user.userId);

  return (
    <div className="overflow-x-auto -mx-4 px-4 [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-[20px] items-center">
        {/* 친구 추가 버튼 */}
        <AddFriendBtn />

        {/* 군인이면 내 프로필도 띄우기 */}
        {myProfile && (
          <FriendProfileCircle
            profile={myProfile}
            selectedSoldierId={soldierId}
          />
        )}

        {/* 친구 목록 */}
        {friendsList.map((friend) => (
          <FriendProfileCircle
            profile={friend}
            key={friend.soldierId}
            selectedSoldierId={soldierId}
          />
        ))}
      </div>
    </div>
  );
}
