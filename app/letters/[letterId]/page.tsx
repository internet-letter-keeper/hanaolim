import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import { dummyLetters } from "@/public/dummyLetters";

type Props = {
  params: Promise<{ letterId: string }>;
  isSoldier: boolean;
  parentId?: number;
};

export default async function LetterDetailPage({ params, isSoldier }: Props) {
  const { letterId } = await params;
  const letter = dummyLetters.find((l) => l.id === +letterId);

  if (!letter) return notFound();

  const isReply = dummyLetters.some((l) => l.parentId === +letter.id);

  return (
    <>
      <div className="w-full" />
      <BasicHeader />

      <div className={cn("py-4")}>
        <LettersDetail lettersDetail={letter} />
      </div>

      {/* 답장 버튼 (군인이고 답장이 아직 없을 경우만) */}
      <div className="flex justify-end text-center w-full">
        {isSoldier && !isReply && (
          <a href={`/write/${letter.id}`}>
            <PrimaryButton title="답장하기" className="px-3 w-1/4 py-[5px]" />
          </a>
        )}
      </div>
    </>
  );
}
