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
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ soldierId: number }>;
};

export default async function CabinetPage({ params }: Props) {
  const { soldierId } = await params;

  const { success, message, data } = await getUserBySoldierId(+soldierId);

  if (!success) {
    throw new Error(message);
  }

  const soldierInfo = data!;

  const session = await auth();

  const isLoggedIn = session?.user;

  const { isNew } = isLoggedIn ? await getIsNew(+session.user.userId) : {};

  const isMyCabinet = session?.user.soldier
    ? session.user.soldier.soldierId === soldierInfo?.soldierId
    : false;

  return (
    <SidebarProvider defaultOpen={false} className="flex-col">
      <div className="flex flex-col gap-4 relative">
        <CabinetHeader isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <FriendsList soldierId={+soldierId} />
        <StatusMessage isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
        <Cabinet
          isMyCabinet={isMyCabinet}
          userId={+soldierInfo.userId}
          soldierId={+soldierId}
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
