import { cn } from "@/lib/utils";
import { Txt } from "../atoms";

type Props = {
  className?: string;
  size?: number;
};

/**
 * 새로운 편지 아이콘
 * @param className 아이콘 크기 조절하기
 * @param size 아이콘 크기
 */
export default function NewIcon({ className, size = 10 }: Props) {
  return (
    <div
      className={cn(
        "rounded-full bg-red-a76 flex items-center justify-center z-10 w-5 h-5",
        className
      )}
    >
      <Txt
        className="text-white leading-none"
        size={size}
        weight="heavy"
        align="center"
      >
        N
      </Txt>
    </div>
  );
}
