"use client";

import { useState } from "react";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersItem from "@/components/letters/LettersItem";
import { dummyLetters } from "@/public/dummyLetters";

const getFilteredButtonStyles = (filter: string) =>
  `flex items-center gap-1 rounded-full border border-green-49d px-2 py-0.5 text-[12px] ${
    filter === "unread" ? "bg-green-49d text-white" : "text-green-49d bg-white"
  }`;

export default function LettersPage() {
  type FilterType = "all" | "favorite" | "hasReply" | "unread";

  const [activeTab, setActiveTab] = useState("send");
  const [filter, setFilter] = useState<FilterType>("all");

  const onChangeFilter = (value: FilterType) => {
    setFilter((prev) => (prev === value ? "all" : value));
  };

  const filteredLetters = dummyLetters
    .filter((l) => l.parentId === undefined)
    .filter((l) => {
      if (filter === "favorite") return l.isFavorite;
      if (filter === "hasReply")
        return dummyLetters.some((r) => r.parentId === l.id);
      if (filter === "unread") return l.isRead === false;
      return true;
    });

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

        <div className="py-4">
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

      <div className="flex-1 bg-white h-screen -m-4">
        <div className="flex justify-between items-center px-4 mb-2">
          <Txt weight="cm" size={13}>
            총 <Txt>{filteredLetters.length}</Txt> 개
          </Txt>
        </div>

        {/* 필터 버튼들 */}
        <div className="flex px-4 gap-x-2">
          <button
            onClick={() => onChangeFilter("favorite")}
            className={getFilteredButtonStyles(filter)}
          >
            즐겨찾기
          </button>

          <button
            onClick={() => onChangeFilter("hasReply")}
            className={getFilteredButtonStyles(filter)}
          >
            답장
          </button>
          <button
            onClick={() => onChangeFilter("unread")}
            className={getFilteredButtonStyles(filter)}
          >
            안읽음
          </button>
        </div>

        <div className="mx-auto px-4">
          {filteredLetters.map((letter) => (
            <LettersItem
              key={letter.id}
              letters={letter}
              allLetters={dummyLetters}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
