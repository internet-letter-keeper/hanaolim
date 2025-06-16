import Image from "next/image";
import { Txt } from "../atoms";

type Props = {
  name?: string;
};

export default function Profile({ name = "별돌이" }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex border border-green-49d rounded-full p-[6px] items-center justify-center">
        <Image
          src="/icons/ic-white-byeoldol.svg"
          alt="byeoldol-icon"
          width={55}
          height={55}
        />
      </div>
      <div>
        <Txt size={20} className="text-gray-353" weight="medium">
          안녕하세요&nbsp;
        </Txt>
        <Txt size={20} className="text-green-49d" weight="medium">
          {name}
        </Txt>
        <Txt size={20} className="text-gray-353" weight="medium">
          님
        </Txt>
      </div>
    </div>
  );
}
