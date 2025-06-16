import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/atoms";
import { fontMap } from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import { dummyLetters } from "@/public/dummyLetters";

type Props = {
  params: {
    letterId: string;
  };
};

export default function LetterDetailPage({ params }: Props) {
  const letterId = parseInt(params.letterId);
  const letter = dummyLetters.find((l) => l.id === letterId);

  if (!letter) return notFound();

  return (
    <>
      <div className="w-full" />
      <BasicHeader />
      {/* 여기서부터 편지 상세 페이지 */}

      <div className={cn("py-4", fontMap.cm)}>
        <LettersDetail lettersDetail={letter} />
      </div>

      {/* 답장 버튼 */}
      <div className="flex justify-end text-center w-full">
        <PrimaryButton title="답장하기" className="px-3 w-1/4 py-[5px]" />
      </div>
    </>
  );
}
