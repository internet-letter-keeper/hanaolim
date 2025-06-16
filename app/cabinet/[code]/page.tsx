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
  params: Promise<{ code: string }>;
};

export default async function CabinetPage({ params }: Props) {
  // TODO: api 연결 후 내 관물대인지 확인하는 로직 작성
  // const { code } = await params;

  const isMyCabinet = true;

  const message = "보고 싶다 얘들아";

  return (
    <SidebarProvider className="flex-col">
      <div className="flex flex-col gap-4">
        <CabinetHeader isMyCabinet={isMyCabinet} />
        <FriendsList />
        <StatusMessage isMyCabinet={isMyCabinet} message={message} />
        <Cabinet isMyCabinet={isMyCabinet} />
        {!isMyCabinet && <LetterMoneyButton />}
      </div>
      <DropDownModal />
    </SidebarProvider>
  );
}
