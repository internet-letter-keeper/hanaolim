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
  isFavorite: isFavoriteState,
  currentUserId,
}: Props) {
  const [isFavorite, toggleFavorite] = useOptimistic(
    isFavoriteState ?? false,
    (state) => !state
  );

  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    toggleFavorite(isFavoriteState);

    const { ok } = await patchFavorite(letterId, currentUserId);

    if (!ok) {
      toggleFavorite(isFavoriteState);
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
