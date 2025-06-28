import {
  CabinetHeader,
  FriendsList,
  LetterMoneyButton,
  StatusMessage,
  DropDownModal,
  CabinetPagenation,
} from "@/components/cabinet";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserBySoldierId } from "@/lib/actions/friend-actions";
import { getIsNew } from "@/lib/actions/letter-actions";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ soldierId: number }>;
  searchParams: Promise<{ page: number }>;
};

export default async function CabinetPage({ params, searchParams }: Props) {
  const { soldierId } = await params;
  const currentPage = (await searchParams).page ?? "1";

  const {
    success,
    message,
    data: soldierInfo,
  } = await getUserBySoldierId(+soldierId);

  if (!success || !soldierInfo) throw new Error(message);

  const session = await auth();

  const isLoggedIn = !!session?.user;

  const isMyCabinet = session?.user.soldier
    ? session.user.soldier.soldierId === soldierInfo?.soldierId
    : false;

  const { isNew } = isLoggedIn ? await getIsNew(+session.user.userId) : {};

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
