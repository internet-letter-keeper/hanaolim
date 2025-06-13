import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "./atoms/Button";
import Txt from "./atoms/Text";

type Props = {
  mode: "soldier" | "viewer";
};

const modeMap = {
  soldier: {
    title: "나를 군인으로 등록하기",
    label: "등록하기",
    imgSrc: "/images/ic-byeoldol-face.svg",
    iconAlt: "사용자를 군인으로 등록하는 페이지로 이동하는 버튼",
    imgAlt: "가운데 별이 박혀 있는 군모를 쓴 하나은행 마스코트 별돌이",
  },
  viewer: {
    title: "보고 싶은 군인 추가하기",
    label: "추가하기",
    imgSrc: "/images/ic-letter.svg",
    iconAlt: "보고 싶은 군인을 추가할 수 있는 페이지로 이동하는 버튼",
    imgAlt: "편지 모양 아이콘",
  },
};

export default function OnboardingOption({ mode }: Props) {
  const selectedMode = modeMap[mode === "soldier" ? "soldier" : "viewer"];

  const { title, label, imgSrc, iconAlt, imgAlt } = selectedMode;

  return (
    <Button
      className={cn(
        "w-[300px] h-[130px] rounded-[20px] p-[18px] border bg-green-5f2 border-green-9e7",
        { "bg-blue-0f5 border-blue-af0": mode === "viewer" }
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
