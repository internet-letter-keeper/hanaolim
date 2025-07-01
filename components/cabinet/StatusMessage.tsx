import Image from "next/image";
import { SoldierUserInfo } from "@/types/common/profile";
import { Txt } from "../atoms";
import EditStatusMsgBtn from "./EditStatusMsgBtn";

type Props = {
  isMyCabinet: boolean;
  soldierInfo: SoldierUserInfo;
};

export default function StatusMessage({ isMyCabinet, soldierInfo }: Props) {
  const { statusMessage } = soldierInfo;

  return (
    <div className="flex mx-2 px-3 py-1 gap-1 items-center bg-[#f14a7615] border border-[#f14a7620] rounded-[15px]">
      <Image
        src="/images/walkie-talkie.svg"
        alt="무전기 이미지"
        width={30}
        height={30}
        priority
        className="w-auto h-auto"
      />

      <Txt className="w-full text-gray-353 truncate" align="left">
        {statusMessage}
      </Txt>

      {isMyCabinet && <EditStatusMsgBtn soldierInfo={soldierInfo} />}
    </div>
  );
}
