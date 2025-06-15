import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  weight?: keyof typeof fontMap;
  align?: keyof typeof alignMap;
} & HTMLAttributes<HTMLSpanElement>;

export const alignMap = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export const fontMap = {
  light: "font-[Hana2-Light]",
  regular: "font-[Hana2-Regular]",
  medium: "font-[Hana2-Medium]",
  cm: "font-[Hana2-CM]",
  bold: "font-[Hana2-Bold]",
  heavy: "font-[Hana2-Heavy]",
};

export default function Txt({
  children,
  className,
  size = 14,
  weight = "regular",
  align = "center",
  ...props
}: PropsWithChildren<Props>) {
  return (
    <span
      className={cn(
        "text-gray-939",
        fontMap[weight],
        alignMap[align],
        className
      )}
      style={{ fontSize: `${size}px` }}
      {...props}
    >
      {children}
    </span>
  );
}
