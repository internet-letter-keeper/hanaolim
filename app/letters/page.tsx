import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import {
  FilterBtn,
  LetterboxTabSelector,
  LettersItem,
  SearchLetter,
} from "@/components/letters";
import { getFilteredLetters } from "@/lib/actions/letter-actions";
import { requireAuth } from "@/utils/auth";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function LettersPage({ searchParams }: Props) {
  const params = await searchParams;
  const box = (params.box as "mine" | "friend") ?? "mine";
  const query = (params.query as string) ?? "";
  const filter = params.filter;

  const session = await requireAuth();
  const currentUserId = session?.user?.userId!;

  const filteredLetters = await getFilteredLetters({
    box,
    userId: currentUserId,
    isFavorite: filter === "favorite",
    isUnread: filter === "unread",
    hasReply: filter === "hasReply",
    query,
  });

  const { data, ok } = filteredLetters;

  if (!ok) {
    return <Txt className="text-gray-400">편지를 불러오지 못했어요</Txt>;
  }

  return (
    <div className="flex flex-col gap-4">
      <BasicHeader title="편지 보관함" />
      <LetterboxTabSelector box={box} />
      <SearchLetter />
      <div className="flex flex-col gap-2">
        <Txt weight="cm" align="left" size={13} className="px-1">
          총 {data?.length}개
        </Txt>
        <FilterBtn />
      </div>
      <div className="flex flex-col gap-3 pb-8">
        {data?.length === 0 ? (
          <Txt className="text-gray-400">조건에 맞는 편지가 없습니다</Txt>
        ) : (
          data?.map((letter: any) => (
            <LettersItem
              key={letter.letterId}
              box={box}
              letter={letter}
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>{" "}
    </div>
  );
}
