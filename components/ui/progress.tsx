"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import { ComponentPropsWithoutRef, forwardRef, ElementRef } from "react";
import { cn } from "@/lib/utils";

type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number;
};

export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-[6px] w-[208px] rounded-full bg-green-fa7",
      className
    )}
    {...props}
    value={value}
  >
    <ProgressPrimitive.Indicator
      className="absolute h-full rounded-full bg-green-a3b transition-all"
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;
