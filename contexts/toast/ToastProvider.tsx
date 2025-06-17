"use client";

import Image from "next/image";
import { useState, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Txt } from "@/components/atoms";
import { ToastContext } from "./ToastContext";

type Props = {
  className?: string;
};

/**
 * ToastProvider는 ToastContext를 제공하는 컴포넌트
 */
export function ToastProvider({
  children,
  className = "top-1/2 left-1/2 transform -translate-x-1/2",
}: PropsWithChildren<Props>) {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState(className);
  const [isAnimating, setIsAnimating] = useState(false);

  const showToast = (msg: string, customPosition?: string) => {
    setMessage(msg);
    if (customPosition) {
      setPosition(customPosition);
    }
    setIsAnimating(true);
    setIsVisible(true);

    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setIsVisible(false);
      }, 150);
    }, 1500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isVisible && (
        <div
          className={cn(
            "fixed z-1000 transition-all duration-150",
            position,
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          )}
        >
          {/* Toast UI */}
          <div className="flex items-center gap-[5px] min-w-[200px] bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)] px-[13px] py-[5px] rounded-[6px] flex-nowrap">
            <Image
              src="/icons/ic-check.svg"
              alt="check"
              width={17}
              height={17}
              className="flex-shrink-0"
            />
            <Txt
              size={15}
              weight="medium"
              className="text-blue-9a0 whitespace-nowrap"
            >
              {message}
            </Txt>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
