import Image from "next/image";
import { ReactNode } from "react";
import { Txt } from "./atoms";

type Props = {
  children: ReactNode;
};

export default function EmptyState({ children }: Props) {
  return (
    <div className="flex flex-col items-center mt-32">
      <Image
        src="/images/byeoldol-sad.svg"
        alt="별돌이가 슬픈 표정을 짓고 있다"
        width={150}
        height={150}
      />
      <Txt weight="medium" size={16} className="text-gray-aaa">
        {children}
      </Txt>
    </div>
  );
}
