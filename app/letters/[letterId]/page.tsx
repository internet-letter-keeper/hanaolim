import { PrimaryButton } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import { getLetterDetail } from "@/lib/actions/letter-actions";
import { requireAuth } from "@/utils/auth";

type Props = {
  params: Promise<{ letterId: string }>;
};

export default async function LetterDetailPage({ params }: Props) {
  const letterId = +(await params).letterId;

  const session = await requireAuth();
  const userId = session.user.userId;

  const letter = await getLetterDetail({ letterId, userId });
  //편지가 없거나 편지 데이터가 없음 (편지는 무조건 있어야 함)
  if (!letter || !letter.data)
    throw new Error("편지 정보를 가져오는 것에 실패했습니다");

  const reply = await getLetterDetail({ letterId, userId, isReply: true });

  return (
    <>
      <BasicHeader />

      {/* 원본 편지 */}
      <div className="py-4 flex justify-center">
        <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
          <LettersDetail letter={letter.data} />
        </div>
      </div>

      {/* 답장 없을 경우 버튼 */}
      {!reply && (
        <div className="flex justify-end px-6 mt-2">
          <a
            href={`/write/${letter.data?.receiverId}/${letter.data?.letterId}`}
          >
            <PrimaryButton title="답장하기" className="px-3 w-28 py-[5px]" />
          </a>
        </div>
      )}

      {/* 답장 데이터가 있을 경우 보여줌 */}
      {reply.data && (
        <div className="flex justify-center mt-4">
          <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
            <LettersDetail letter={reply.data} />
          </div>
        </div>
      )}
    </>
  );
}
