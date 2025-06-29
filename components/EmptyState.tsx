import Image from "next/image";
import { ReactNode } from "react";
import { Txt } from "./atoms";

type Props = {
  children: ReactNode;
};

export default function EmptyState({ children }: Props) {
  return (
    <div className="flex flex-col justify-center items-center pt-32">
      <Image
        src={"/images/byeoldol-sad.svg"}
        width={150}
        height={150}
        alt={"별돌이가 슬픈 표정을 짓고 있다"}
      />
      <Txt weight="bold" size={16}>
        {children}
      </Txt>
    </div>
  );
}
