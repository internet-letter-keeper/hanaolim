"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { ERROR_MESSAGES } from "@/constants/message";
import { useToast } from "@/contexts/toast/ToastContext";
import { getLetterDetail } from "@/lib/actions/letter-actions";
import { getSenderNameId } from "@/lib/actions/write-actions";
import { cn } from "@/lib/utils";
import { Letter } from "@/types/letters";
import { Txt } from "../atoms";
import LetterView from "./LetterView";
import PigSplash from "./PigSplash";

// 답장 페이지 또는 편지 상세 페이지로 이동하기 위해 letterId 받아옴
// 모달 제어를 위해 콜백 함수 받아옴 (onHandle), 페이지에서 useState 이용해서 모달 제어

type Props = {
  letterId: number;
  onHandleModal: () => void;
};

const MAX_LENGTH = 110;

export default function LetterModal({ letterId, onHandleModal }: Props) {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [senderName, setSenderName] = useState<string>("");
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  //110자 넘어가면 더보기로 처리
  const isLong = (letter?.content.length ?? 0) > MAX_LENGTH;

  const preview = isLong
    ? letter?.content.slice(0, MAX_LENGTH)
    : letter?.content;

  const { data } = useSession();

  const userId = data?.user.userId;
  const soldierId = data?.user.soldier.soldierId;

  //포인트 적립 애니메이션 제어
  const [showPoint, setShowPoint] = useState(false);
  const [earnedBonus, setEarnedBonus] = useState(0);

  useEffect(() => {
    (async () => {
      if (!userId || !soldierId) {
        return;
      }

      try {
        // 편지 데이터 가져오기
        const letterData = await getLetterDetail({ letterId, userId });

        // 발신자 이름 가져오기
        const {
          success,
          message,
          data: senderData,
        } = await getSenderNameId(letterId);
        if (success) {
          if (!senderData || !senderData.userName) {
            throw new Error(ERROR_MESSAGES.DATA.NOT_FOUND);
          }

          setSenderName(senderData.userName);
          setLetter(letterData.data);
        }
        if (!success) {
          showToast(message, "", "error");
        }

        // 포인트 적립 처리
        const res = await fetch("/api/earn-point", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ letterId, soldierId }),
        });

        const result = await res.json();

        if (result.earn && result.bonus > 0) {
          setEarnedBonus(result.bonus);
          setShowPoint(true);
        }
      } catch (error) {
        throw new Error("편지 데이터 로딩 실패");
      }
    })();
  }, [letterId, userId, soldierId]);

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

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-100 sm:w-sm w-full -translate-x-1/2 left-1/2 bg-modal-overlay"
      onClick={onClickOverlay}
    >
      {showPoint && (
        <PigSplash point={earnedBonus} onSkip={() => setShowPoint(false)} />
      )}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-11/12 sm:w-[22rem] p-6 bg-white rounded-[10px]",
          "flex flex-col transition-all duration-[500ms] ease-in-out",
          letter ? "max-h-[80vh] opacity-100" : "max-h-[150px] opacity-0"
        )}
      >
        {letter ? (
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
              {letter.createDate.toLocaleString("ko-KR", {
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
              {preview}
              {isLong && (
                <Txt size={16} className="text-gray-500">
                  ...더보기
                </Txt>
              )}
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
        ) : (
          //TODO: 로딩이 좀 있는 것 같아서 넣어놨음 나중에 제거하든지 함
          <Txt className="text-center text-gray-400 text-sm">
            편지를 불러오는 중...
          </Txt>
        )}
      </div>
    </div>
  );
}
