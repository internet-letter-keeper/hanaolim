import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import PrimaryButton from "../atoms/PrimaryButton";
import Profile from "../common/Profile";

const ButtonStyle = "border border-gray-353/25 py-2";

export default function DropDownModal() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col m-7 mt-14 gap-6">
              <Profile />
              <div className="flex flex-col gap-2">
                <PrimaryButton
                  title="편지 보관함"
                  className={ButtonStyle}
                  textSize={14}
                  weight="regular"
                  color="gray"
                />
                <div className="flex gap-2">
                  <PrimaryButton
                    title="군인으로 등록하기"
                    className={ButtonStyle}
                    color="gray"
                  />
                  <PrimaryButton
                    title="친구 관리"
                    className={ButtonStyle}
                    color="gray"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-353/25 h-1 rounded-[2px] mb-[6px] w-1/5 " />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
