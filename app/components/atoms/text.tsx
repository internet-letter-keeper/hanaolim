import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextProps = {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  weight?: keyof typeof fontMap;
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

const Text = (
  { children, className, size = "md", weight = "regular" }: TextProps
) => {
  return (
    <span className={cn(fontMap[weight], sizeMap[size], className)}>
      {children}
    </span>
  );
};

export default Text;
