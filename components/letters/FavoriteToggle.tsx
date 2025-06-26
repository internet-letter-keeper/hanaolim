"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { patchFavorite } from "@/lib/actions/letter-actions";

type Props = {
  letterId: number;
  isFavorite: boolean | null | undefined;
  currentUserId: number;
};

export default function FavoriteToggle({
  letterId,
  isFavorite: initialFavorite,
  currentUserId,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  // 즐겨찾기 토글
  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();

    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite); // 로컬 즉시 반영

    const res = await patchFavorite(letterId, currentUserId);

    if (!res.ok) {
      setIsFavorite(!newFavorite); // 실패 시 롤백
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      <Image
        src={
          isFavorite
            ? "/icons/ic-favorite-colered.svg"
            : "/icons/ic-favorite-none.svg"
        }
        alt="즐겨찾기"
        width={20}
        height={20}
      />
    </button>
  );
}
