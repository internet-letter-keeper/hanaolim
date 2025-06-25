"use client";

import clsx from "clsx";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Txt } from "../atoms";

export default function FilterBtn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const box = (searchParams.get("box") as "mine" | "friend") ?? "mine";
  const currentFilter = searchParams.get("filter");

  const filters =
    box === "mine"
      ? [
          { key: "favorite", label: "즐겨찾기" },
          { key: "unread", label: "안 읽은 편지" },
        ]
      : [
          { key: "favorite", label: "즐겨찾기" },
          { key: "hasReply", label: "답장 온 편지" },
        ];

  const handleClick = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentFilter === key) {
      params.delete("filter");
    } else {
      params.set("filter", key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex px-4 gap-x-2">
      {filters.map(({ key, label }) => {
        const isActive = currentFilter === key;
        return (
          <button
            key={key}
            onClick={() => handleClick(key)}
            className={clsx(
              "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px]",
              isActive
                ? "bg-green-49d border-green-49d"
                : "bg-white border-green-49d"
            )}
          >
            <Txt
              weight="cm"
              size={12}
              className={isActive ? "text-white" : "text-green-49d"}
            >
              {label}
            </Txt>
          </button>
        );
      })}
    </div>
  );
}
