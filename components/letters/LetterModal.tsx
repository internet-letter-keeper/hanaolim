"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { getLetterDetail } from "@/lib/actions/letter-actions";
import { getSenderName } from "@/lib/actions/write-actions";
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

const MAX_LENGTH = 120;

export default function LetterModal({ letterId, onHandleModal }: Props) {
  const [letter, setLetter] = useState<Letter | null>(null);
  const [senderName, setSenderName] = useState<string>("");
  const [senderId, setSenderId] = useState<number>(0);
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //120자 넘어가면 더보기로 처리
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
        const senderData = await getSenderName(letterId);

        if (!senderData || !senderData.userName) {
          throw new Error("유저 이름이 존재하지 않습니다.");
        }

        setSenderName(senderData.userName);
        setSenderId(senderData.userId);
        setLetter(letterData.data);

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
    router.push(
      `/write/${soldierId}/${letterId}?name=${encodedName}&id=${senderId}`
    );
  };

  //편지 상세 페이지로 이동
  const handleGoToDetail = () => {
    router.push(`/letters/${letterId}`);
  };

  // 모달 바깥 클릭 시 모달 닫기
  const onClickOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) onHandleModal();
  };

  // 로딩 상태 처리
  if (!letter || !senderName) {
    return (
      <div
        ref={overlay}
        className="fixed inset-0 z-100 sm:w-sm w-full -translate-x-1/2 left-1/2 bg-modal-overlay"
        onClick={onClickOverlay}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-[22rem] p-6 bg-white rounded-[10px] text-center">
          <Txt>편지를 불러오는 중...</Txt>
        </div>
      </div>
    );
  }

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-11/12 sm:w-[22rem] p-6 bg-white rounded-[10px]
                    text-center max-h-[66vh] flex flex-col cursor-pointer"
      >
        <div className="flex w-full justify-between">
          <Txt size={18} weight="bold" className="text-green-49d">
            {letter.senderName}({letter.nickname})
          </Txt>
          <Image
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
        <Txt align="left" size={16} className="py-4" onClick={handleGoToDetail}>
          {preview}{" "}
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
      </div>
    </div>
  );
}
