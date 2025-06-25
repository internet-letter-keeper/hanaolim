import Link from "next/link";
import { cn } from "@/lib/utils";
import { Txt } from "../atoms";

type Props = {
  box: "mine" | "friend";
};

export default function LetterboxTabSelector({ box }: Props) {
  return (
    <div className="flex justify-between gap-5">
      <Link
        href="/letters?box=mine"
        className={cn(
          "flex justify-center w-full bg-green-49d py-3 rounded-[10px] border border-[#D6E9E7]",
          {
            "bg-white-7f9 ": box === "friend",
          }
        )}
      >
        <Txt
          size={16}
          weight="medium"
          className={cn("text-white-fff", {
            "text-green-49d": box === "friend",
          })}
        >
          내 관물대
        </Txt>
      </Link>

      <Link
        href="/letters?box=friend"
        className={cn(
          "flex justify-center w-full bg-green-49d py-3 rounded-[10px] border border-[#D6E9E7]",
          {
            "bg-white-7f9 text-green-49d": box === "mine",
          }
        )}
      >
        <Txt
          size={16}
          weight="medium"
          className={cn("text-white-fff", {
            "text-green-49d": box === "mine",
          })}
        >
          친구 관물대
        </Txt>
      </Link>
    </div>
  );
}
