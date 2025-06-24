import Image from "next/image";
import Link from "next/link";
import { SoldierUserInfo } from "@/types/common/profile";
import { requireAuth } from "@/utils/auth";
import { CopyCodeBtn } from ".";
import { Txt } from "../atoms";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";

type Props = {
  isMyCabinet: boolean;
  soldierInfo: SoldierUserInfo;
};

export default async function CabinetHeader({
  isMyCabinet,
  soldierInfo,
}: Props) {
  const session = await requireAuth();

  const isSoldier = session.user.isSoldier;

  const soldierName = isMyCabinet ? "나" : soldierInfo?.User.userName + "님";

  return (
    <header className={"flex items-center px-2 h-[40px]"}>
      {/* 군인 아닌 유저에게는 뒤로가기 버튼 안 보이게 */}
      {isSoldier && (
        <Link href="/" className="mr-[17px]">
          <Image
            src="/icons/ic-chevron-left.svg"
            alt="뒤로가기"
            width={12}
            height={20}
          />
        </Link>
      )}

      {/* 타이틀 */}
      <Txt size={23} weight="cm" className="flex-1" align="left">
        {soldierName}의 관물대
      </Txt>

      {/* 내 관물대일 때 vs 아닐 때 분기처리 */}
      {isMyCabinet && <CopyCodeBtn />}

      <SidebarHeader>
        {/* TODO:새로운 메세지가 왔을 경우 분기 처리 
          isNewMessage={true}  이런식으로 하면 됩니다
        */}
        <SidebarTrigger />
      </SidebarHeader>
    </header>
  );
}
