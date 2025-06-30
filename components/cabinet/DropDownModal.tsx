"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from "@/contexts/toast/ToastContext";
import { cn } from "@/lib/utils";
import { isNotSoldierYet } from "@/utils/date";
import { PrimaryButton } from "../atoms";
import { NewIcon } from "../common";
import Profile from "../common/Profile";

type Props = {
  isNew: boolean | undefined;
};

const ButtonStyle = "border border-gray-353/25 py-3";

export default function DropDownModal({ isNew }: Props) {
  const { data: session } = useSession();
  const isSoldier = session?.user.isSoldier;
  const startDate = session?.user.soldier.startDate;

  const router = useRouter();

  const { showToast } = useToast();

  const goToLetters = async () => {
    if (!startDate) return null;

    if (isNotSoldierYet(startDate)) {
      showToast("입대일 이후에 열어볼 수 있어요", "", "warning");
      return;
    }

    router.push("/letters");
  };
  const goToRegisterSoldier = () => router.push("/registerSoldier");
  const goToFriends = () => router.push("/friends");
  const goToMy = () => router.push("/my");

  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex justify-center items-center">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col m-7 mt-10 gap-6">
                <Profile />
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <PrimaryButton
                      title="편지 보관함"
                      className={cn(ButtonStyle, "gap-1")}
                      textSize={16}
                      color="gray"
                      onClick={goToLetters}
                      icon={isNew ? <NewIcon /> : undefined}
                    />
                    <PrimaryButton
                      title="내 정보"
                      className={cn(ButtonStyle, "gap-1")}
                      textSize={16}
                      color="gray"
                      onClick={goToMy}
                    />
                  </div>
                  <div className="flex gap-2">
                    {!isSoldier && (
                      <PrimaryButton
                        title="군인으로 등록하기"
                        className={ButtonStyle}
                        color="gray"
                        textSize={16}
                        onClick={goToRegisterSoldier}
                      />
                    )}
                    <PrimaryButton
                      title="친구 관리"
                      className={ButtonStyle}
                      color="gray"
                      textSize={16}
                      onClick={goToFriends}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div
                  className="bg-gray-353/25 h-1 rounded-[2px] mb-[6px] w-1/5 cursor-pointer"
                  onClick={toggleSidebar}
                />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
