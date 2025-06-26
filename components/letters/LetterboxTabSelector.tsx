import Link from "next/link";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { requireAuth } from "@/utils/auth";
import { Txt } from "../atoms";

type Props = {
  box: "mine" | "friend";
};

export default async function LetterboxTabSelector({ box }: Props) {
  const session = await requireAuth();
  const isLoginSoldier = session?.user?.isSoldier;

  if (!isLoginSoldier && (box !== "friend" || !box)) {
    redirect("/letters?box=friend");
  }

  return (
    <div className="flex justify-between gap-5">
      <Link
        href="/letters?box=mine"
        replace
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
        replace
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
