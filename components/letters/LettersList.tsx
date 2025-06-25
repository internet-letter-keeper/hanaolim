import { getFilteredLetters } from "@/lib/actions/letter-actions";
import { Txt } from "../atoms";
import LettersItem from "./LettersItem";

type Props = {
  searchParams: {
    box?: "mine" | "friend";
    filter?: "favorite" | "unread" | "hasReply";
    query?: string;
  };
  currentUserId: number;
};

export default async function LettersList({
  searchParams,
  currentUserId,
}: Props) {
  const box = searchParams.box ?? "mine";
  const filter = searchParams.filter;
  const query = searchParams.query?.toLowerCase();

  const filteredLetter = await getFilteredLetters({
    box,
    userId: currentUserId,
    isFavorite: filter === "favorite",
    isUnread: filter === "unread",
    hasReply: filter === "hasReply",
    query,
  });

  if (!filteredLetter.ok) {
    return (
      <div className="text-center text-gray-400">편지를 불러오지 못했어요.</div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 pb-8">
      {filteredLetter.data?.length === 0 ? (
        <Txt className="text-gray-400">조건에 맞는 편지가 없습니다.</Txt>
      ) : (
        filteredLetter.data?.map((letter: any) => (
          <LettersItem
            key={letter.letterId}
            box={box}
            letter={letter}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  );
}
