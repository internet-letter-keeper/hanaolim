"use client";

import { cn } from "@/lib/utils";
import Txt, { alignMap, fontMap } from "./Text";

type Props = {
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: keyof typeof Color;
  disabled?: boolean;
  padding?: string;
  rounded?: keyof typeof Round;
  textSize?: number;
  align?: keyof typeof alignMap;
  weight?: keyof typeof fontMap;
  icon?: React.ReactNode;
};

const Color = {
  green: ["bg-green-49d", "text-white-fff"],
  white: ["bg-white-2f2", "text-green-49d"],
  gray: ["bg-white-fff", "text-gray-353"],
};

const Round = {
  sm: "rounded-[5px]",
  md: "rounded-[8px]",
  lg: "rounded-[15px]",
};

/**
 * 버튼 컴포넌트
 * title: 버튼 텍스트
 * className: 버튼 클래스(Padding 포함)
 * color: 버튼 색상
 * disabled: 버튼 비활성화 여부
 * onClick: 버튼 클릭 이벤트
 * type: 버튼 타입
 * rounded: 버튼 라운드
 */
export default function PrimaryButton({
  className,
  color = "green",
  disabled = false,
  onClick,
  type = "button",
  rounded = "md",
  title,
  textSize = 14,
  align = "center",
  weight = "regular",
  icon,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-full py-4",
        Color[color][0],
        Round[rounded],
        {
          "opacity-50": disabled,
          "cursor-pointer": !disabled,
        },
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {icon}
      <Txt
        className={Color[color][1]}
        size={textSize}
        align={align}
        weight={weight}
      >
        {title}
      </Txt>
    </button>
  );
}
