import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "./atoms/Button";
import Txt from "./atoms/Text";

//onBording 컴포넌트에 들어갈 option 컴포넌트
type Props = {
  title: string;
  label: string;
  imgSrc: string;
  color?: keyof typeof Color;
};

const Color = {
  green: ["bg-green-5f2", "text-green-9e7"],
  blue: ["bg-blue-0f5", "text-blue-af0"],
};

export default function OnboardingOption({
  title,
  label,
  imgSrc,
  color = "green",
}: Props) {
  return (
    <>
      <Button
        className={cn(
          "w-[300px] h-[130px] rounded-[20px] p-[18px] border",
          Color[color][0],
          Color[color][1]
        )}
      >
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-col gap-y-[11px] pl-1">
            <Txt size={18} align="left" weight="bold" className="text-gray-939">
              {title}
            </Txt>
            <div className="flex flex-row">
              <Txt size={12} weight="cm" className="text-gray-353 pr-2">
                {label}
              </Txt>
              <Image
                src={"/icons/ic-chevron-right.svg"}
                alt={"이동하기 "}
                width={5}
                height={10}
              />
            </div>
          </div>
          <div>
            <Image
              src={imgSrc}
              alt={"별돌이 머리 or 편지"}
              width={70}
              height={70}
            />
          </div>
        </div>
      </Button>
    </>
  );
}
