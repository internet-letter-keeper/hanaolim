"use client";

import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import PrimaryButton from "../atoms/PrimaryButton";
import Profile from "../common/Profile";

const ButtonStyle = "border border-gray-353/25 py-3";

export default function DropDownModal() {
  // TODO: 세션 프로바이더로 나중에 받아와서 구분하기

  const router = useRouter();
  const goToLetters = () => router.push("/letters");
  const goToRegisterSoldier = () => router.push("/registerSoldier");
  const goToFriends = () => router.push("/friends");

  const { toggleSidebar } = useSidebar();
  return (
    <div className="flex justify-center items-center">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex flex-col m-7 mt-10 gap-6">
                <Profile userName="별돌이" endDate={new Date()} />
                <div className="flex flex-col gap-2">
                  <PrimaryButton
                    title="편지 보관함"
                    className={ButtonStyle}
                    textSize={16}
                    color="gray"
                    onClick={goToLetters}
                  />
                  <div className="flex gap-2">
                    {/* TODO: 군인일 경우 버튼 '군인으로 등록하기'안보이게 분기 처리 */}
                    <PrimaryButton
                      title="군인으로 등록하기"
                      className={ButtonStyle}
                      color="gray"
                      textSize={16}
                      onClick={goToRegisterSoldier}
                    />
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
