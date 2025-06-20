"use client";

import { createContext, useContext } from "react";
import { ToastType } from "@/types/toast";

type ToastContextType = {
  showToast: (message: string, position?: string, type?: ToastType) => void;
};

/**
 * ToastContext를 사용하기 위해서는 ToastProvider 컴포넌트 내부에서 사용해야함
 */
export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

/**
 *  ToastContext할 부분에 useToast를 사용해야함
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
