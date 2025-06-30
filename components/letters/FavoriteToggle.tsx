"use client";

import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { patchFavorite } from "@/lib/actions/letter-actions";

type Props = {
  letterId: number;
  currentUserId: number;
  isFavorite?: boolean | null;
};

export default function FavoriteToggle({
  letterId,
  isFavorite: initialFavoriteState,
  currentUserId,
}: Props) {
  const [isFavorite, setIsFavorite] = useState(initialFavoriteState);

  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);

    const { ok } = await patchFavorite(letterId, currentUserId);

    if (!ok) {
      setIsFavorite(!newFavorite);
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
