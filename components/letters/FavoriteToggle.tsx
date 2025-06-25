"use client";

import Image from "next/image";
import { useState } from "react";
import { patchFavorite } from "@/lib/actions/letter-actions";
import { Letter } from "@/types/letters";

type Props = {
  letters: Letter;
  currentUserId: number;
  onFavoriteChange: (letterId: number, newState: boolean) => void;
};

export default function FavoriteToggle({
  letters,
  currentUserId,
  onFavoriteChange,
}: Props) {
  const { letterId, isFavorite: initialFavorite } = letters;

  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  // 즐겨찾기 토클
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite); // 로컬 즉시 반영
    onFavoriteChange(letterId, newFavorite); // 부모 상태도 업데이트

    const res = await patchFavorite(letterId, currentUserId);
    if (!res.ok) {
      setIsFavorite(!newFavorite); // 실패 시 롤백
      onFavoriteChange(letterId, !newFavorite);
    }
  };

  // 날짜 포맷
  const date = new Date(createDate);
  const formattedDate = date.toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <button>
      <Image
        src={
          isFavorite
            ? "/icons/ic-favorite-colered.svg"
            : "/icons/ic-favorite-none.svg"
        }
        alt="즐겨찾기"
        width={20}
        height={20}
        onClick={handleToggleFavorite}
      />
    </button>
  );
}
