import Image from "next/image";
import { SoldierUserInfo } from "@/types/common/profile";
import { cn } from "@/lib/utils";
import { Txt } from "../atoms";
import EditStatusMsgBtn from "./EditStatusMsgBtn";

type Props = {
  isMyCabinet: boolean;
  soldierInfo: SoldierUserInfo;
};

export default function StatusMessage({ isMyCabinet, soldierInfo }: Props) {
  const { statusMessage, soldierId } = soldierInfo;

  return (
    <div className="flex mx-2 px-3 py-1 gap-1 items-center bg-blue-0f5 border border-blue-af0 rounded-[15px]">
      <Image
        src="/images/walkie-talkie.svg"
        alt="무전기 이미지"
        width={30}
        height={30}
      />

      <Txt
        className={cn("w-full text-gray-353 truncate", {
          "text-gray-aaa": !statusMessage,
        })}
        align="left"
      >
        {statusMessage ?? "상태메세지를 입력해주세요."}
      </Txt>

      {isMyCabinet && (
        <EditStatusMsgBtn soldierId={soldierId} statusMessage={statusMessage} />
      )}
    </div>
  );
}
