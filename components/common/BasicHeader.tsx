"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Txt } from "../atoms";

type Props = {
  title?: string;
  showBackButton?: boolean;
  className?: string;
};

export default function BasicHeader({
  title,
  showBackButton = true,
  className,
}: Props) {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <header className={cn("flex items-center px-2 h-[40px]", className)}>
      {showBackButton && (
        <button onClick={handleBack}>
          <Image
            src="/icons/ic-chevron-left.svg"
            alt="뒤로가기"
            width={12}
            height={20}
          />
        </button>
      )}
      <Txt size={22} weight="cm" align="center" className="flex-1">
        {title}
      </Txt>
      {showBackButton && <div className="w-[12px]" />}
    </header>
  );
}
