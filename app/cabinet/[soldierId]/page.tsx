import {
  CabinetHeader,
  FriendsList,
  LetterMoneyButton,
  StatusMessage,
  DropDownModal,
  CabinetPagenation,
} from "@/components/cabinet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserBySoldierId, postFriend } from "@/lib/actions/friend-actions";
import { getIsNew } from "@/lib/actions/letter-actions";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ soldierId: number }>;
  searchParams: Promise<{ page: number; add: "true" }>;
};

export default async function CabinetPage({ params, searchParams }: Props) {
  const { soldierId } = await params;
  const currentPage = (await searchParams).page ?? "1";
  const isAutoAddFriendEnabled = (await searchParams).add === "true";

  // 현재 페이지 관물대의 주인
  const {
    success,
    message,
    data: soldierInfo,
  } = await getUserBySoldierId(+soldierId);

  if (!success || !soldierInfo) throw new Error(message);

  const session = await auth();
  const isLoggedIn = !!session?.user;
  const loginUserId = session?.user.userId;
  const hasFollow = session?.user.follow;

  const isMyCabinet = session?.user.soldier
    ? session.user.soldier.soldierId === soldierInfo?.soldierId
    : false;

  const { isNew } = isLoggedIn ? await getIsNew(+session.user.userId) : {};

  // 미로그인 유저가 링크를 통해 접속 - 회원가입+로그인 - 관물대로 리다이렉트 후
  // param add=true면 자동으로 관물대 주인을 친구로 등록
  if (isAutoAddFriendEnabled && loginUserId && !hasFollow)
    await postFriend(soldierInfo.code, +loginUserId);

  return (
    <SidebarProvider defaultOpen={false} className="flex-col">
      <div className="flex flex-col gap-4 relative">
        <CabinetHeader isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <FriendsList soldierId={+soldierId} />
        <StatusMessage isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <CabinetPagenation
          userId={+soldierInfo.userId}
          soldierId={+soldierId}
          currentPage={+currentPage}
        />
        {!isMyCabinet && (
          <LetterMoneyButton
            soldierId={+soldierId}
            soldierName={soldierInfo.User.userName}
          />
        )}
      </div>
      <DropDownModal isNew={isNew} />
    </SidebarProvider>
  );
}
