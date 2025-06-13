import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof fontMap;
  align?: keyof typeof alignMap;
};

const alignMap = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

const fontMap = {
  light: "font-[Hana2-Light]",
  regular: "font-[Hana2-Regular]",
  medium: "font-[Hana2-Medium]",
  cm: "font-[Hana2-CM]",
  bold: "font-[Hana2-Bold]",
  heavy: "font-[Hana2-Heavy]",
};

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Txt({
  children,
  className,
  size = "sm",
  weight = "regular",
  align = "center",
}: PropsWithChildren<Props>) {
  return (
    <span
      className={cn(
        "text-black-939",
        fontMap[weight],
        sizeMap[size],
        alignMap[align],
        className
      )}
    >
      {children}
    </span>
  );
}
