"use client";

import { cn } from "@/lib/utils";
import Txt, { alignMap, fontMap, sizeMap } from "./Text";

type Props = {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  color?: keyof typeof Color;
  width?: string;
  disabled?: boolean;
  padding?: string;
  title: string;
  rounded?: keyof typeof Round;
  textSize?: keyof typeof sizeMap;
  align?: keyof typeof alignMap;
  weight?: keyof typeof fontMap;
};

const Color = {
  green: ["bg-green-49d", "text-white-fff"],
  white: ["bg-white-2f2", "text-green-49d"],
};
const Round = {
  sm: "rounded-[5px]",
  md: "rounded-[8px]",
  lg: "rounded-[15px]",
};

export default function PrimaryButton({
  className,
  color = "green",
  width = "w-full",
  disabled = false,
  onClick,
  type = "button",
  padding = "py-4",
  rounded = "md",
  title,
  textSize = "md",
  align = "center",
  weight = "regular",
}: Props) {
  return (
    <button
      className={cn(
        `${Color[color][0]} ${width} ${disabled ? "opacity-50" : "cursor-pointer"} ${padding} ${Round[rounded]} `,
        className
      )}
      onClick={onClick}
      type={type}
    >
      <Txt
        className={`${Color[color][1]}`}
        size={textSize}
        align={align}
        weight={weight}
      >
        {title}
      </Txt>
    </button>
  );
}
