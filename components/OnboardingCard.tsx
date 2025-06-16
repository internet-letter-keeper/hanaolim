import { modeMap } from "@/constants/onboardingMode";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "./atoms/Button";
import Txt from "./atoms/Text";

//onBording 컴포넌트에 들어갈 option 컴포넌트

type Props = {
  mode: "soldier" | "viewer";
};

export default function OnboardingOption({ mode }: Props) {
  const selectedMode = modeMap[mode === "soldier" ? "soldier" : "viewer"];

  const { title, label, imgSrc, iconAlt, imgAlt } = selectedMode;

  return (
    <Button
      className={cn(
        "px-[300px] h-[130px] rounded-[20px] p-[18px] border bg-green-5f2 border-green-9e7",
        { "bg-blue-0f5 border-blue-af0": mode === "viewer" }
      )}
    >
      <div className="flex flex-row gap-[9px]">
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
              alt={iconAlt}
              width={5}
              height={10}
            />
          </div>
        </div>
        <div>
          <Image src={imgSrc} alt={imgAlt} width={70} height={70} />
        </div>
      </div>
    </Button>
  );
}
