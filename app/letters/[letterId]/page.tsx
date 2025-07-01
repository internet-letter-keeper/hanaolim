import Link from "next/link";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { LettersDetail, PigSplashWrapper } from "@/components/letters";
import { ERROR_MESSAGES } from "@/constants/message";
import { handleEarnPoint } from "@/lib/actions/earn-point-actions";
import {
  getLetterDetail,
  patchUserReadDate,
} from "@/lib/actions/letter-actions";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{ letterId: string }>;
};

export default async function LetterDetailPage({ params }: Props) {
  const { letterId: rawLetterId } = await params;
  const letterId = +rawLetterId;

  // letterId가 숫자가 아닐 때
  if (Number.isNaN(letterId))
    throw new Error(ERROR_MESSAGES.LETTER.ID_IS_NUMBER);

  const session = await auth();
  const userId = session?.user.userId;
  const soldierId = session?.user.soldier.soldierId;

  if (!userId) return;

  // 원본 편지와 답장 모두 불러오기
  const { data: letter } = await getLetterDetail({ letterId, userId });
  const { data: reply } = await getLetterDetail({
    letterId,
    userId,
    isReply: true,
  });

  // 내가 쓰거나 받은 편지가 아니거나, 존재하지 않는 편지일 때
  if (!letter)
    throw new Error(ERROR_MESSAGES.LETTER.NOT_FOUND_OR_ACCESS_DENIED);

  const { senderName, receiverId, senderId, childLetterId } = letter;

  if (!receiverId || !senderId)
    throw new Error(ERROR_MESSAGES.LETTER.NOT_FOUND_OR_ACCESS_DENIED);

  // 포인트 적립 처리
  const res = soldierId
    ? await handleEarnPoint({
        letterId,
        soldierId,
        senderId,
        receiverId,
      })
    : await patchUserReadDate(letterId, userId);

  if (!senderName) {
    throw new Error(ERROR_MESSAGES.COMMON.SERVER_ERROR);
  }

  const encodedName = encodeURIComponent(senderName);

  return (
    <div className="flex flex-col items-center gap-4">
      <BasicHeader className="w-full" />

      {"point" in res && res.point !== 0 && (
        <PigSplashWrapper point={res.point} />
      )}

      <div className="px-4 w-full flex flex-col items-end gap-4">
        {/* 원본 편지 */}
        {letter && <LettersDetail letter={letter} />}

        {/* 답장 */}
        {reply?.letterId && <LettersDetail letter={reply} />}

        {/* 답장 없을 경우 답장하기 버튼 */}
        {!childLetterId && receiverId == userId && (
          <Link
            href={`/write/${soldierId}/${letterId}?name=${encodedName}`}
            className="inline-flex bg-green-49d px-3 py-1 rounded-[5px] border border-[#D6E9E7]"
          >
            <Txt size={12} className="text-white">
              답장하기
            </Txt>
          </Link>
        )}
      </div>
    </div>
  );
}
