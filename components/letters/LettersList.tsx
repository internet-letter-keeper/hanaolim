import { getFilteredLetters } from "@/lib/actions/letter-actions";
import { LettersItem } from ".";
import { EmptyState } from "../common";

type Props = {
  letters: Awaited<ReturnType<typeof getFilteredLetters>>["data"];
  box: "mine" | "friend";
  currentUserId: number;
};

export default function LettersList({ letters, box, currentUserId }: Props) {
  return (
    <div className="flex flex-col gap-3 pb-8">
      {!letters?.length ? (
        <EmptyState>편지가 없어요</EmptyState>
      ) : (
        letters.map((letter) => (
          <LettersItem
            key={letter.letterId}
            letter={letter}
            currentUserId={currentUserId}
            box={box}
          />
        ))
      )}
    </div>
  );
}
