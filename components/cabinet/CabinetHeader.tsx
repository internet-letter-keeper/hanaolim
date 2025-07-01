import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getIsNew } from "@/lib/actions/letter-actions";
import { auth } from "@/lib/auth";
import { SoldierUserInfo } from "@/types/common/profile";
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
  const session = await auth();

  const isLoggedIn = !!session?.user;

  const { isNew } = isLoggedIn ? await getIsNew(+session.user.userId) : {};

  const isSoldier = session?.user.isSoldier;

  const soldierName = isMyCabinet ? "나" : soldierInfo?.User.userName + "님";

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const fullUrl = `${protocol}://${host}`;

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
            className="w-3 h-5"
          />
        </Link>
      )}

      {/* 타이틀 */}
      <Txt size={23} weight="cm" className="flex-1" align="left">
        {soldierName}의 관물대
      </Txt>

      {/* 내 관물대일 때 vs 아닐 때 분기처리 */}
      {isMyCabinet && <CopyCodeBtn />}

      {isLoggedIn ? (
        <SidebarHeader>
          <SidebarTrigger isNewMessage={isNew} />
        </SidebarHeader>
      ) : (
        <Link
          href={`/auth/signIn?callbackUrl=${encodeURIComponent(fullUrl + "/cabinet/" + soldierInfo.soldierId)}`}
          className="border border-green-49d py-1 px-4 inline-flex rounded-[5px]"
        >
          <Txt weight="cm" className="text-green-49d">
            로그인
          </Txt>
        </Link>
      )}
    </header>
  );
}
