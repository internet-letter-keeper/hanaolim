import { cn } from "@/lib/utils";
import { Txt } from "../atoms";

type Props = {
  className?: string;
};

/**
 * 새로운 편지 아이콘
 * @param className 아이콘 크기 조절하기
 * @returns
 */
export default function NewIcon({ className = "w-5 h-5" }: Props) {
  return (
    <div
      className={cn(
        "rounded-full bg-red-a76 flex items-center justify-center z-10",
        className
      )}
    >
      <Txt className="text-white" size={10} weight="heavy">
        N
      </Txt>
    </div>
  );
}
