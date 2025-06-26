import Image from "next/image";
import { PropsWithChildren } from "react";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";

type Props = {
  userName: string;
};

export default function LetterPageLayout({
  userName,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col">
      <BasicHeader />
      <div className="flex flex-col w-full px-4 relative min-h-[calc(100dvh-64px)]">
        <div className="flex items-center justify-center gap-2 mt-2">
          <Image
            src="/images/byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image src="/images/letter.svg" alt="편지" width={50} height={50} />
        </div>

        <div className="flex mt-[14px] mb-13 items-center justify-center whitespace-nowrap">
          <Txt size={20} weight="bold" className="text-green-49d">
            {userName}&nbsp;
          </Txt>
          <Txt size={20} weight="bold">
            님에게 편지를 작성해주세요!
          </Txt>
        </div>

        {children}
      </div>
    </div>
  );
}
