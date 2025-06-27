import Image from "next/image";
import Link from "next/link";
import { Txt } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import {
  getLetterDetail,
  patchUserReadDate,
} from "@/lib/actions/letter-actions";
import { handleEarnPoint } from "@/lib/actions/point-earn-action";
import { requireAuth } from "@/utils/auth";

type Props = {
  params: Promise<{ letterId: number }>;
};

export default async function LetterDetailPage({ params }: Props) {
  const letterId = +(await params).letterId;

  const session = await requireAuth();
  const userId = session.user.userId;
  const soldierId = session?.user?.soldier?.soldierId;

  const { data } = await getLetterDetail({ letterId, userId });
  const { data: replyData } = await getLetterDetail({
    letterId,
    userId,
    isReply: true,
  });

  if (!data || !replyData)
    throw new Error("편지 정보를 가져오는 것에 실패했습니다");

  if (!data.readDate) {
    if (!!soldierId) {
      await handleEarnPoint({ letterId, soldierId });
    } else {
      await patchUserReadDate(letterId, userId);
    }
  }

  return (
    <>
      <BasicHeader revalidateLetter />

      {/* 원본 편지 */}
      <div className="py-4 flex justify-center">
        <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
          <div className="flex justify-center gap-4 mb-3">
            <Image
              src="/images/byeoldol-face.svg"
              alt="별돌이 얼굴"
              width={50}
              height={50}
            />
            <Image
              src="/images/letter.svg"
              alt="별돌이 얼굴"
              width={50}
              height={50}
            />
          </div>
          <LettersDetail letter={data} />
        </div>
      </div>

      {/* 답장 없을 경우 버튼 */}
      {!data.hasReply && data.receiverId === userId && (
        <div className="flex justify-end px-6 mt-2">
          <Link
            href={`/write/${soldierId}/${data.letterId}`}
            className="flex justify-center bg-green-49d px-3 py-1 rounded-[5px] border border-[#D6E9E7] text-white"
          >
            <Txt size={12} className="text-white">
              답장하기
            </Txt>
          </Link>
        </div>
      )}

      {replyData?.parentLetterId && (
        <div className="flex justify-center mt-4">
          <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
            <LettersDetail letter={replyData} />
          </div>
        </div>
      )}
    </>
  );
}
