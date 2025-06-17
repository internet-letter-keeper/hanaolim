import Image from "next/image";
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

  const reply = dummyLetters.find((l) => l.parentId === +letter.id);

  return (
    <>
      <div className="w-full" />
      <BasicHeader />

      <div className="py-4 flex justify-center items-center">
        <div className={cn("bg-white rounded-lg shadow-sm p-4")}>
          <div className="flex items-center gap-1 mt-2 mb-4">
            <Image
              src={"/images/byeoldol-face.svg"}
              alt="별돌이 얼굴"
              width={50}
              height={50}
            />
            <Image
              src={"/images/letter.svg"}
              alt="편지"
              width={50}
              height={50}
            />
          </div>
          <LettersDetail lettersDetail={letter} />
        </div>
      </div>

      <div className="flex justify-end text-center w-full">
        {isSoldier && !reply && (
          <a href={`/write/${letter.id}`}>
            <PrimaryButton title="답장하기" className="px-3 w-1/4 py-[5px]" />
          </a>
        )}
      </div>

      {/* 답장이 있을 경우 아래에 추가 표시 */}
      {reply && (
        <div className="mt-6">
          <LettersDetail lettersDetail={reply} />
        </div>
      )}
    </>
  );
}
