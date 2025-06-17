"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersItem from "@/components/letters/LettersItem";
import { dummyLetters } from "@/public/dummyLetters";

export default function LettersPage() {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");
  const [filter, setFilter] = useState<"all" | "favorite">("all");

  const totalCount = dummyLetters.length;
  const favoriteCount = dummyLetters.filter(
    (letter) => letter.isFavorite
  ).length;

  const onChangeFilter = (value: "all" | "favorite") => {
    setFilter(value);
  };

  const filteredLetters =
    filter === "all"
      ? dummyLetters
      : dummyLetters.filter((letter) => letter.isFavorite);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="max-w-screen-sm mb-4">
        <BasicHeader title="편지 보관함" />

        <div className="relative mt-4">
          <Input
            placeholder="작성자, 내용 ..."
            usage="modal"
            className="rounded-[10px] pr-10"
          />
          <img
            src="/icons/ic-search.svg"
            alt="검색"
            width={20}
            height={20}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1EA698]"
          />
        </div>

        <div className={"py-4"}>
          <div className="flex justify-center gap-2">
            <PrimaryButton
              title="내 관물대로 퐁당"
              onClick={() => setActiveTab("send")}
              color={activeTab === "send" ? "green" : "white"}
              className="py-3"
              weight="cm"
            />

            <PrimaryButton
              title="친구 관물대"
              onClick={() => setActiveTab("receive")}
              color={activeTab === "receive" ? "green" : "white"}
              className="py-3"
              weight="cm"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 py-4 bg-white h-screen -m-4">
        <div className="flex justify-between items-center px-4 mb-2">
          <Txt weight="cm" size={13}>
            총&nbsp;
            <Txt>
              {cn(filter === "all" ? `${totalCount}` : `${favoriteCount}`)}
            </Txt>
            개
          </Txt>
        </div>

        <div className="flex px-4 gap-x-2">
          <div className="flex items-center gap-1 rounded-full border border-green-49d px-2 py-0.5 text-green-49d text-[12px]">
            즐겨찾기
          </div>
          <div className="flex items-center gap-1 rounded-full border border-green-49d px-2 py-0.5 text-green-49d text-[12px]">
            답장
          </div>
          <div className="flex items-center gap-1 rounded-full border border-green-49d px-2 py-0.5 text-green-49d text-[12px]">
            안읽음
          </div>
        </div>

        <div className="mx-auto px-4">
          {filteredLetters.map((letter) => (
            <LettersItem key={letter.id} letters={letter} />
          ))}
        </div>

        {/* <div className="h-16" /> */}
      </div>
    </div>
  );
}
