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
      <BasicHeader />

      {/* 원본 편지 */}
      <div className="py-4 flex justify-center">
        <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
          <div className="flex justify-center gap-1 mt-2 mb-4">
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

      {/* 답장 작성 버튼 */}
      {isSoldier && !reply && (
        <div className="flex justify-end px-6 mt-2">
          <a href={`/write/${letter.id}`}>
            <PrimaryButton title="답장하기" className="px-3 w-28 py-[5px]" />
          </a>
        </div>
      )}

      {/* 답장 편지 */}
      {reply && (
        <div className="flex justify-center mt-4">
          <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
            <LettersDetail lettersDetail={reply} isReply />
          </div>
        </div>
      )}
    </>
  );
}
