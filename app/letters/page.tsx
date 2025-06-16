"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { fontMap } from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";
import LettersList from "@/components/letters/LettersList";
import { dummyLetters } from "@/public/dummyLetters";

export default function LettersPage() {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");
  const [filter, setFilter] = useState<"all" | "favorite">("all");

  const filteredLetters =
    filter === "all"
      ? dummyLetters
      : dummyLetters.filter((letter) => letter.isFavorite);

  return (
    <div className="w-full overflow-x-hidden p-0">
      <div className="w-full bg-white-7f9">
        <div className="max-w-screen-sm mx-auto px-4">
          <BasicHeader title="편지 보관함" />

          <div className={cn("py-4", fontMap.cm)}>
            <div className="flex justify-center gap-2">
              <Button
                className={cn(
                  "flex justify-center items-center w-[170px] h-[50px] py-[14px] px-0 shrink-0 rounded-lg text-sm",
                  activeTab === "send"
                    ? "bg-green-49d text-white"
                    : "bg-white-2f2 text-green-49d"
                )}
                onClick={() => setActiveTab("send")}
              >
                내 관물대로 퐁당
              </Button>

              <Button
                className={cn(
                  "flex justify-center items-center w-[170px] h-[50px] py-[14px] px-0 shrink-0 rounded-lg text-sm",
                  activeTab === "receive"
                    ? "bg-green-49d text-white"
                    : "bg-white-2f2 text-green-49d"
                )}
                onClick={() => setActiveTab("receive")}
              >
                친구 관물대
              </Button>
            </div>

            <div className="flex justify-center mt-4">
              <Input
                placeholder="작성자, 내용 ..."
                inputType="search"
                className="w-[336px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-sm mx-auto px-4">
        <LettersList
          letters={filteredLetters}
          totalCount={dummyLetters.length}
          filter={filter}
          onChangeFilter={setFilter}
        />
      </div>
    </div>
  );
}
