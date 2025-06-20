import { ToastProvider } from "@/contexts/toast/ToastProvider";
import { requireAuth } from "@/utils/auth";
import { getUserBySoldierId } from "@/lib/actions/friend-actions";
import {
  Cabinet,
  CabinetHeader,
  FriendsList,
  LetterMoneyButton,
  StatusMessage,
  DropDownModal,
} from "@/components/cabinet";
import { SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  params: Promise<{ soldierId: string }>;
};

export default async function CabinetPage({ params }: Props) {
  const session = await requireAuth();

  const { soldierId } = await params;

  const soldierInfo = await getUserBySoldierId(+soldierId);

  // 로그인한 유저가 군인이 아니면 false, 군인이면 현재 route param의 soldierId를 비교
  const isMyCabinet = session.user.soldier
    ? session.user.soldier.soldierId === soldierInfo?.soldierId
    : false;

  if (!soldierInfo)
    throw new Error("해당 군인의 정보를 찾을 수 없습니다. 다시 시도해주세요.");

  return (
    <ToastProvider>
      <SidebarProvider defaultOpen={false} className="flex-col">
        <div className="flex flex-col gap-4">
          <CabinetHeader isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
          <FriendsList soldierId={+soldierId} />
          <StatusMessage isMyCabinet={isMyCabinet} soldierInfo={soldierInfo} />
          <Cabinet isMyCabinet={isMyCabinet} />
          {!isMyCabinet && <LetterMoneyButton soldierId={+soldierId} />}
        </div>
        <DropDownModal />
      </SidebarProvider>
    </ToastProvider>
  );
}
