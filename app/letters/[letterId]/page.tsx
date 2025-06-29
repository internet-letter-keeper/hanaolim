"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { LettersDetail, PigSplash } from "@/components/letters";
import { ERROR_MESSAGES } from "@/constants/message";
import { useToast } from "@/contexts/toast/ToastContext";
import { handleEarnPoint } from "@/lib/actions/earn-point-actions";
import {
  getLetterDetail,
  patchUserReadDate,
  revalidateLetters,
} from "@/lib/actions/letter-actions";

export default function LetterDetailPage() {
  const { letterId: rawLetterId } = useParams();

  if (!rawLetterId) {
    throw new Error(ERROR_MESSAGES.LETTER.NOT_FOUND);
  }

  const letterId = Number(rawLetterId);

  if (Number.isNaN(letterId)) {
    throw new Error(ERROR_MESSAGES.LETTER.ID_IS_NUMBER);
  }

  const [letter, setLetter] =
    useState<Awaited<ReturnType<typeof getLetterDetail>>["data"]>();
  const [reply, setReply] =
    useState<Awaited<ReturnType<typeof getLetterDetail>>["data"]>();

  const { data } = useSession();

  if (!data) {
    throw new Error(ERROR_MESSAGES.LETTER.NOT_FOUND);
  }

  const userId = data?.user.userId;
  const soldierId = data?.user.soldier.soldierId;

  const [showPoint, setShowPoint] = useState(false);
  const [earnedBonus, setEarnedBonus] = useState(0);

  const { showToast } = useToast();

  useEffect(() => {
    (async () => {
      if (!userId) return;

      try {
        const { data } = await getLetterDetail({ letterId, userId });
        const { data: replyData } = await getLetterDetail({
          letterId,
          userId,
          isReply: true,
        });

        if (!data || !data.senderId || !data.receiverId) throw new Error();

        setLetter(data);
        setReply(replyData);

        if (soldierId) {
          // 포인트 적립 처리
          const { point } = await handleEarnPoint({
            letterId,
            soldierId,
            senderId: data?.receiverId,
            receiverId: data?.receiverId,
          });

          if (point > 0) {
            setEarnedBonus(point);
            setShowPoint(true);
          }
        } else {
          await patchUserReadDate(letterId, userId);
        }
        await revalidateLetters();
      } catch {
        showToast(ERROR_MESSAGES.LETTER.NOT_FOUND, "", "error");
      }
    })();
  }, [letterId, userId, soldierId]);

  return (
    <div className="flex flex-col items-center gap-4">
      <BasicHeader className="w-full" />

      {showPoint && (
        <PigSplash point={earnedBonus} onSkip={() => setShowPoint(false)} />
      )}

      <div className="px-4 w-full flex flex-col items-end gap-4">
        {/* 원본 편지 */}
        {letter && <LettersDetail letter={letter} />}

        {/* 답장 없을 경우 버튼 */}
        {letter && !letter.hasReply && letter.receiverId === userId && (
          <Link
            href={`/write/${soldierId}/${letter.letterId}`}
            className="inline-flex bg-green-49d px-3 py-1 rounded-[5px] border border-[#D6E9E7]"
          >
            <Txt size={12} className="text-white">
              답장하기
            </Txt>
          </Link>
        )}

        {letter?.hasReply && reply && <LettersDetail letter={reply} />}
      </div>
    </div>
  );
}
