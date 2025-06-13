"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Txt from "../atoms/Text";

type Props = {
  title: string;
  showBackButton?: boolean;
  className?: string;
};

export default function BasicHeader({
  title,
  className,
  showBackButton = true,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className={cn("flex items-center px-4 py-3 bg-white-7f9", className)}
    >
      {showBackButton && (
        <button onClick={handleBack} className="mr-2">
          <Image
            src="/icons/ic-chevron-left.svg"
            alt="뒤로가기"
            width={10}
            height={20}
          />
        </button>
      )}
      <Txt size={22} weight="cm" align="center" className="flex-1">
        {title}
      </Txt>
      {showBackButton && <div className="w-[10px]" />}
    </header>
  );
}
