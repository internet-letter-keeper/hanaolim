import { Suspense } from "react";
import { Txt } from "@/components/atoms";
import { BasicHeader, EmptyState } from "@/components/common";
import {
  FilterBtn,
  LetterboxTabSelector,
  LettersList,
  SearchLetter,
} from "@/components/letters";
import { getFilteredLetters } from "@/lib/actions/letter-actions";
import { requireAuth } from "@/utils/auth";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LettersPage({ searchParams }: Props) {
  const params = await searchParams;
  const session = await requireAuth();
  const currentUserId = session?.user?.userId;

  const isSoldierStauts = session?.user?.isSoldier;

  const soldierBox = isSoldierStauts ? "mine" : "friend";
  const box = (params.box as "mine" | "friend") ?? soldierBox;
  const query = (params.query as string) ?? "";
  const filter = params.filter;

  const { data, ok } = await getFilteredLetters({
    box,
    userId: currentUserId,
    isFavorite: filter === "favorite",
    isUnread: filter === "unread",
    hasReply: filter === "hasReply",
    query,
  });

  if (!ok) {
    return <EmptyState>편지를 불러오지 못했어요</EmptyState>;
  }

  return (
    <div className="flex flex-col gap-4">
      <BasicHeader isRefresh title="편지 보관함" />
      {isSoldierStauts && <LetterboxTabSelector box={box} />}
      <Suspense>
        <SearchLetter />
      </Suspense>
      <div className="flex flex-col gap-2">
        <Txt weight="cm" align="left" size={13} className="px-1">
          총 {data?.length}개
        </Txt>
        <Suspense>
          <FilterBtn />
        </Suspense>
      </div>
      <LettersList letters={data} box={box} currentUserId={currentUserId} />
    </div>
  );
}
