"use client";

import Image from "next/image";
import { useOptimistic, type MouseEvent } from "react";
import { patchFavorite } from "@/lib/actions/letter-actions";

type Props = {
  letterId: number;
  isFavorite: boolean | null | undefined;
  currentUserId: number;
};

export default function FavoriteToggle({
  letterId,
  isFavorite: favorite,
  currentUserId,
}: Props) {
  const [isFavorite, toggleFavorite] = useOptimistic(
    favorite ?? false,
    (state) => !state
  );

  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    toggleFavorite(favorite);

    const res = await patchFavorite(letterId, currentUserId);

    if (!res.ok) {
      toggleFavorite(favorite);
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
