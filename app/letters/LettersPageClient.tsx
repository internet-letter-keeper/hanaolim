"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersItem from "@/components/letters/LettersItem";

type FilterType = "all" | "favorite" | "hasReply" | "unread";

type Letter = {
  letterId: number;
  nickname: string;
  content: string;
  fileUrl?: string;
  iconId?: number;
  createDate: string; // 서버에서 ISO string 으로 전달됨
  readDate?: string | null;
  parentLetterId?: number | null;
  receiverId: number;
  senderId: number;
  receiverName: string;
  senderName: string;
  isFavorite: boolean;
};

type Props = {
  initialLetters: Letter[];
  currentUserId: number;
};

export default function LettersPageClient({
  initialLetters,
  currentUserId,
}: Props) {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);

  const letters = useMemo(() => initialLetters, [initialLetters]);

  const filteredLetters = useMemo(() => {
    let base = letters.filter((l) => l.parentLetterId === null);

    base = base.filter((l) => {
      return activeTab === "send"
        ? l.receiverId == currentUserId
        : l.senderId === currentUserId;
    });

    // 추가 필터링
    if (filter === "favorite") base = base.filter((l) => l.isFavorite);
    if (filter === "hasReply")
      base = base.filter((l) =>
        letters.some((r) => r.parentLetterId === l.letterId)
      );
    if (filter === "unread") base = base.filter((l) => !l.readDate);

    // 검색 필터
    if (searching && searchText.trim() !== "") {
      const lower = searchText.toLowerCase();

      const matchedLetters = letters.filter(
        (l) =>
          l.nickname.toLowerCase().includes(lower) ||
          l.receiverName.toLowerCase().includes(lower) ||
          l.senderName.toLowerCase().includes(lower) ||
          l.content.toLowerCase().includes(lower)
      );

      const matchedOriginals = new Set<number>();

      matchedLetters.forEach((l) => {
        if (l.parentLetterId) {
          // 답장인 경우 → 부모 편지 포함
          matchedOriginals.add(l.parentLetterId);
        } else {
          matchedOriginals.add(l.letterId);
        }
      });

      base = base.filter((l) => matchedOriginals.has(l.letterId));
    }

    return base;
  }, [letters, filter, activeTab, currentUserId, searchText, searching]);

  const onChangeFilter = (value: FilterType) => {
    setFilter((prev) => (prev === value ? "all" : value));
  };

  const handleSearch = () => {
    setSearching(true);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="max-w-screen-sm mb-4">
        <BasicHeader title="편지 보관함" />
        <div className="relative mt-4">
          <Input
            placeholder="작성자, 내용 ..."
            usage="modal"
            className="rounded-[10px] pr-10"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>
            <Image
              src="/icons/ic-search.svg"
              alt="검색"
              width={20}
              height={20}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            />
          </button>
        </div>

        <div className="py-1">
          <div className="flex justify-center gap-2">
            <PrimaryButton
              title="내 관물대"
              onClick={() => setActiveTab("send")}
              color={activeTab === "send" ? "green" : "white"}
              className="py-2 my-4 border-b border-[#D6E9E7]"
              weight="cm"
            />
            <PrimaryButton
              title="친구 관물대"
              onClick={() => setActiveTab("receive")}
              color={activeTab === "receive" ? "green" : "white"}
              className="py-2 my-4 border-b border-[#D6E9E7]"
              weight="cm"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white-afa h-screen -m-4">
        <div className="flex justify-between items-center px-4 mb-2">
          <Txt weight="cm" size={13}>
            총 {filteredLetters.length}개
          </Txt>
        </div>

        <div className="flex px-4 gap-x-2">
          {(["favorite", "hasReply", "unread"] as FilterType[]).map((type) => {
            const isActive = filter === type;
            return (
              <button
                key={type}
                onClick={() => onChangeFilter(type)}
                className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[12px] ${
                  isActive
                    ? "bg-green-49d border-green-49d"
                    : "bg-white border-green-49d"
                }`}
              >
                <Txt
                  weight="cm"
                  size={12}
                  className={isActive ? "text-white" : "text-green-49d"}
                >
                  {type === "favorite" && "즐겨찾기"}
                  {type === "hasReply" && "답장"}
                  {type === "unread" && "안읽음"}
                </Txt>
              </button>
            );
          })}
        </div>

        <div className="mx-auto px-4">
          {filteredLetters.map((letter) => (
            <LettersItem
              key={letter.letterId}
              letters={letter}
              allLetters={letters}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
