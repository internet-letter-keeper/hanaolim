import {
  Cabinet,
  CabinetHeader,
  FriendsList,
  LetterMoneyButton,
  StatusMessage,
  DropDownModal,
} from "@/components/cabinet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserBySoldierId } from "@/lib/actions/friend-actions";
import { getIsNew } from "@/lib/actions/letter-actions";
import { requireAuth } from "@/utils/auth";

type Props = {
  params: Promise<{ soldierId: number }>;
};

export default async function CabinetPage({ params }: Props) {
  const session = await requireAuth();

  const { soldierId } = await params;

  const soldierInfo = await getUserBySoldierId(+soldierId);

  if (!session.user.userId) return;

  const { isNew } = await getIsNew(+session.user.userId);

  const isMyCabinet = session.user.soldier
    ? session.user.soldier.soldierId === soldierInfo?.soldierId
    : false;

  if (!soldierInfo)
    throw new Error("해당 군인의 정보를 찾을 수 없습니다. 다시 시도해주세요.");

  return (
    <SidebarProvider defaultOpen={false} className="flex-col">
      <div className="flex flex-col gap-4 relative">
        <CabinetHeader isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <FriendsList soldierId={+soldierId} />
        <StatusMessage isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <Cabinet
          isMyCabinet={isMyCabinet}
          userId={+soldierInfo.userId}
          loginId={+session.user.userId}
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
