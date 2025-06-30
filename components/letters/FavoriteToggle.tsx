"use client";

import Image from "next/image";
import { useOptimistic, type MouseEvent } from "react";
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
  const [isFavorite, toggleFavorite] = useOptimistic(
    initialFavoriteState ?? false,
    (prev) => !prev
  );

  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    toggleFavorite(null);

    const { ok } = await patchFavorite(letterId, currentUserId);

    if (!ok) {
      toggleFavorite(null);
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
