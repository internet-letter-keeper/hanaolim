import Image from "next/image";
import { Txt } from "../atoms";

export default function Toast() {
  return (
    <div className="flex items-center gap-[5px] w-fit bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)] px-[13px] py-[5px] rounded-[6px]">
      <Image src="/icons/ic-check.svg" alt="check" width={17} height={17} />
      <Txt size={12} weight="medium" className="text-blue-9a0">
        계좌번호가 복사되었습니다!
      </Txt>
    </div>
  );
}
