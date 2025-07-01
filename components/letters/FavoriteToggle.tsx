"use client";

import Image from "next/image";
import { useReducer, type MouseEvent } from "react";
import { patchFavorite } from "@/lib/actions/letter-actions";

type Props = {
  letterId: number;
  currentUserId: number;
  isFavorite?: boolean | null;
};

export default function FavoriteToggle({
  letterId,
  isFavorite,
  currentUserId,
}: Props) {
  const [isFavoriteState, toggleIsFavorite] = useReducer(
    (prev) => !prev,
    isFavorite ?? false
  );

  const handleToggleFavorite = async (e: MouseEvent) => {
    e.preventDefault();
    toggleIsFavorite();
    const { ok } = await patchFavorite(letterId, currentUserId);
    if (!ok) {
      toggleIsFavorite();
    }
  };

  return (
    <button onClick={handleToggleFavorite}>
      <Image
        src={
          isFavoriteState
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
