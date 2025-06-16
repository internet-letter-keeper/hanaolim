import Image from "next/image";
import { ONBOARDING_MODE } from "@/constants/onboardingMode";
import { cn } from "@/lib/utils";
import { Button, Txt } from "./atoms";

//onBording 컴포넌트에 들어갈 option 컴포넌트

type Props = {
  mode: "soldier" | "viewer";
};

export default function OnboardingOption({ mode }: Props) {
  const selectedMode =
    ONBOARDING_MODE[mode === "soldier" ? "soldier" : "viewer"];

  const { title, label, imgSrc, iconAlt, imgAlt } = selectedMode;

  return (
    <Button
      className={cn(
        "h-[130px] rounded-[20px] p-[18px] border bg-green-5f2 border-green-9e7",
        { "bg-blue-0f5 border-blue-af0": mode === "viewer" }
      )}
    >
      <div className="flex gap-[9px] justify-between">
        <div className="flex flex-col gap-y-[11px]">
          <Txt size={18} align="left" weight="bold">
            {title}
          </Txt>
          <div className="flex gap-2">
            <Txt size={12} weight="cm" className="text-gray-353">
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
        <Image src={imgSrc} alt={imgAlt} width={70} height={70} />
      </div>
    </Button>
  );
}
