"use client";

import { cn } from "@/lib/utils";
import { Txt } from ".";

const Color = {
  green: ["bg-green-49d", "text-white-fff"],
  white: ["bg-white-2f2", "text-green-49d"],
  gray: ["bg-white-fff", "text-gray-353"],
};

type Props = {
  title: string;
  className?: string;
  color?: keyof typeof Color;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  isMini?: boolean;
};

/**
 * 버튼 컴포넌트
 * title: 버튼 텍스트
 * className: 버튼 클래스(Padding 포함)
 * color: 버튼 색상
 * disabled: 버튼 비활성화 여부
 * onClick: 버튼 클릭 이벤트
 * type: 버튼 타입
 * icon: 텍스트 옆에 아이콘이 있는 버튼
 * isMini: 양옆으로 늘어나지 않는 버튼
 */
export default function PrimaryButton({
  title,
  className,
  color = "green",
  disabled = false,
  onClick,
  type = "button",
  icon,
  isMini,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "flex items-center justify-center w-full py-[10px] rounded-[5px]",
        Color[color][0],
        {
          "text-14 px-5 py-1 w-fit": isMini,
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
      <Txt
        className={Color[color][1]}
        size={16}
        weight={isMini ? "cm" : "medium"}
      >
        {title}
      </Txt>
      {icon}
    </button>
  );
}
