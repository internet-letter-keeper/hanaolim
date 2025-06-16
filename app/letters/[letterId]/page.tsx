import { notFound } from "next/navigation";
import { use } from "react";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/atoms";
import { fontMap } from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import { dummyLetters } from "@/public/dummyLetters";

type Props = {
  params: Promise<{ letterId: string }>;
  isSoldier: boolean;
};

export default function LetterDetailPage({ params, isSoldier }: Props) {
  const letterId = use(params);
  const letter = dummyLetters.find((l) => l.id === +letterId);

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
        {isSoldier && (
          <PrimaryButton title="답장하기" className="px-3 w-1/4 py-[5px]" />
        )}
      </div>
    </>
  );
}
