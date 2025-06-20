import { requireAuth } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { SoldierUserInfo } from "@/types/common/profile";
import { Txt } from "../atoms";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import CopyCodeBtn from "./CopyCodeBtn";

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

  const soldierName = soldierInfo?.User.userName;

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

      {/* 내 관물대일 때 vs 아닐 때 분기처리 */}
      {isMyCabinet && isSoldier ? (
        <div className="flex flex-1 justify-between mr-4">
          <Txt size={23} weight="cm">
            나의 관물대
          </Txt>
          <CopyCodeBtn />
        </div>
      ) : (
        <div className="items-baseline flex-1">
          <Txt size={23} weight="bold" className="text-green-49d">
            {soldierName}
          </Txt>
          <Txt size={20} weight="cm">
            &nbsp;님의 관물대
          </Txt>
        </div>
      )}

      <SidebarHeader>
        {/* TODO:새로운 메세지가 왔을 경우 분기 처리 
          isNewMessage={true}  이런식으로 하면 됩니다
        */}
        <SidebarTrigger />
      </SidebarHeader>
    </header>
  );
}
