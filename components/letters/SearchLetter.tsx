"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "../atoms";

export default function SearchLetter() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = () => {
    const query = inputRef.current?.value.trim();
    if (query) {
      const box = searchParams.get("box") || "mine";
      router.push(`/letters?box=${box}&query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative mt-4 mb-4">
      <Input
        customRef={inputRef}
        placeholder="작성자, 내용 ..."
        usage="modal"
        className="rounded-[10px] pr-10"
        onKeyDown={handleKeyDown}
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
  );
}
