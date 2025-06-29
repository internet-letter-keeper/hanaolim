"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES } from "@/constants/message";
import { useToast } from "@/contexts/toast/ToastContext";
import { useScrollEdges } from "@/hooks/useScrollEdge";
import { handleEarnPoint } from "@/lib/actions/earn-point-actions";
import { getLetterDetail } from "@/lib/actions/letter-actions";
import { cn } from "@/lib/utils";
import { formatLetterData } from "@/utils/letter";
import { LetterView, PigSplash } from ".";
import { Txt } from "../atoms";

// 답장 페이지 또는 편지 상세 페이지로 이동하기 위해 letterId 받아옴
// 모달 제어를 위해 콜백 함수 받아옴 (onHandle), 페이지에서 useState 이용해서 모달 제어

type Props = {
  letterId: number;
  onHandleModal: () => void;
};

export default function LetterModal({ letterId, onHandleModal }: Props) {
  const [letter, setLetter] =
    useState<Awaited<ReturnType<typeof getLetterDetail>>["data"]>();
  const [senderName, setSenderName] = useState<string>("");
  const overlay = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { showToast } = useToast();

  const { data } = useSession();

  const userId = data?.user.userId;
  const soldierId = data?.user.soldier.soldierId;

  //포인트 적립 애니메이션 제어
  const [showPoint, setShowPoint] = useState(false);
  const [earnedPoint, setEarnedPoint] = useState(0);

  useEffect(() => {
    (async () => {
      if (!userId || !soldierId) {
        throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);
      }

      try {
        // 편지 데이터 가져오기
        const { data: letterData } = await getLetterDetail({
          letterId,
          userId,
        });

        if (
          !letterData ||
          !letterData.senderName ||
          !letterData.senderId ||
          !letterData.receiverId
        )
          throw new Error();

        const { senderName, senderId, receiverId } = letterData;

        setLetter(letterData ? formatLetterData(letterData) : null);
        setSenderName(senderName);

        // 포인트 적립 처리
        const { point } = await handleEarnPoint({
          letterId,
          soldierId,
          senderId,
          receiverId,
        });

        if (point > 0) {
          setEarnedPoint(point);
          setShowPoint(true);
        }
      } catch {
        showToast(ERROR_MESSAGES.LETTER.NOT_FOUND, "", "error");
      }
    })();
  }, [letterId, userId, soldierId, showToast]);

  //답장하는 페이지로 이동
  const handleGoReply = () => {
    if (!senderName) {
      return;
    }

    const encodedName = encodeURIComponent(senderName);
    router.push(`/write/${soldierId}/${letterId}?name=${encodedName}`);
  };

  //편지 상세 페이지로 이동
  const handleGoToDetail = () => {
    router.push(`/letters/${letterId}`);
  };

  // 모달 바깥 클릭 시 모달 닫기
  const onClickOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) onHandleModal();
  };

  //스크롤 감지 페이드 처리
  const { ref: scrollRef, isBottom } = useScrollEdges();

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-100 sm:w-sm w-full -translate-x-1/2 left-1/2 bg-modal-overlay"
      onClick={onClickOverlay}
    >
      {showPoint && (
        <PigSplash point={earnedPoint} onSkip={() => setShowPoint(false)} />
      )}
      <div
        ref={scrollRef}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-11/12 sm:w-[22rem] p-6 bg-white-fff rounded-[10px]",
          "flex flex-col transition-all duration-[500ms] ease-in-out overflow-auto scrollbar-hide",
          letter ? "max-h-[66vh] opacity-100" : "max-h-[150px] opacity-0"
        )}
      >
        {!isBottom && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white-fff to-transparent pointer-events-none z-10" />
        )}

        {letter && (
          <>
            <div className="flex w-full justify-between">
              <Txt size={18} weight="bold" className="text-green-49d">
                {letter.senderName}({letter.nickname})
              </Txt>
              <Image
                className="cursor-pointer"
                src={"/icons/ic-x-in-circle.svg"}
                alt={"동그란 모양의 x 버튼"}
                width={20}
                height={20}
                onClick={(e) => {
                  e.stopPropagation();
                  onHandleModal();
                }}
              />
            </div>
            <Txt align="left" className="text-gray-500">
              {letter.createDate?.toLocaleString("ko-KR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Txt>
            <Txt
              align="left"
              size={16}
              className="py-4 cursor-pointer"
              onClick={handleGoToDetail}
            >
              {letter.content}
            </Txt>
            {letter.fileUrl && <LetterView fileUrl={letter.fileUrl} />}
            <div className="flex w-full justify-end">
              <Txt
                align="left"
                weight="bold"
                className="text-green-49d rounded-[5px] border border-green-49d px-2 py-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoReply();
                }}
              >
                답장하기
              </Txt>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
