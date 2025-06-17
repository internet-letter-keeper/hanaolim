"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Txt } from "../atoms";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";

type Props = {
  isMyCabinet: boolean;
};

export default function CabinetHeader({ isMyCabinet }: Props) {
  //TODO: 디자인 - 나/타인 제목 글씨 크기 통일 안 하면 이상할 듯?
  //TODO: 디자인 - 가입 직후 상태메시지가 비어 있는 화면 디자인 나오면 작업

  const router = useRouter();

  const handleBack = () => router.push("/");

  const shareCabinetUrl = () => alert("캐비넷 링크 복사 완료");

  const soldierName = "일병 김재윤";

  const isSoldier = true;

  return (
    <header className={"flex items-center px-2 h-[40px]"}>
      {/* 군인 아닌 유저에게는 뒤로가기 버튼 안 보이게 */}
      {isSoldier && (
        <button onClick={handleBack} className="mr-[17px]">
          <Image
            src="/icons/ic-chevron-left.svg"
            alt="뒤로가기"
            width={12}
            height={20}
          />
        </button>
      )}

      {/* 내 관물대일 때 vs 아닐 때 분기처리 */}
      {isMyCabinet ? (
        <div className="flex justify-between w-full">
          <Txt size={23} weight="cm">
            나의 관물대
          </Txt>

          <button onClick={shareCabinetUrl} className="mr-[19px]">
            <Image
              src="/icons/ic-share.svg"
              alt="캐비넷 링크 공유 아이콘"
              width={18}
              height={18}
            />
          </button>
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
