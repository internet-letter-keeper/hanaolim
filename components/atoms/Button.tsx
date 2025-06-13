"use client";

import { PropsWithChildren } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  className,
  onClick,
  type = "button",
  children,
  disabled = false,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
