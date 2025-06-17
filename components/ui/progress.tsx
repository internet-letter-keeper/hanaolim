"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import { ComponentPropsWithoutRef, forwardRef, ElementRef } from "react";
import { cn } from "@/lib/utils";

type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number;
  variant?: "green" | "yellow";
};

export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, variant = "green", ...props }, ref) => {
  const rootBg = variant === "green" ? "bg-green-fa7" : "bg-white-fff";
  const indicatorBg = variant === "green" ? "bg-green-a3b" : "bg-yellow-32b";
  const maxWidth = variant === "green" ? "min-w-[208px]" : "min-w-[258px]";


  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-[8px] rounded-full w-full",
        rootBg,
        maxWidth,
        className
      )}
      {...props}
      value={value}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "absolute h-full rounded-full transition-all",
          indicatorBg
        )}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;
