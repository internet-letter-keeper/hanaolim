import { ToastProvider } from "@/contexts/toast/ToastProvider";
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
  const { soldierId } = await params;

  const isMyCabinet = true;

  const message = "보고 싶다 얘들아";

  return (
    <ToastProvider>
      <SidebarProvider defaultOpen={false} className="flex-col">
        <div className="flex flex-col gap-4">
          <CabinetHeader isMyCabinet={isMyCabinet} />
          <FriendsList />
          <StatusMessage isMyCabinet={isMyCabinet} message={message} />
          <Cabinet isMyCabinet={isMyCabinet} />
          {!isMyCabinet && <LetterMoneyButton soldierId={+soldierId} />}
        </div>
        <DropDownModal />
      </SidebarProvider>
    </ToastProvider>
  );
}
