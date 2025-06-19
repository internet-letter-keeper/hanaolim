"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { dummyLetters } from "@/public/dummyLetters";
import { Txt } from "../atoms";
import LetterView from "./LetterView";
import PointPop from "./PopPoint";

// 답장 페이지 또는 편지 상세 페이지로 이동하기 위해 letterId 받아옴
// 모달 제어를 위해 콜백 함수 받아옴 (onHandle), 페이지에서 useState 이용해서 모달 제어

type Props = {
  letterId: string;
  onHandleModal: () => void;
};

export default function LetterModal({ letterId, onHandleModal }: Props) {
  const overlay = useRef<HTMLDivElement>(null);

  const router = useRouter();

  //TODO: 테스트용 더미 데이터 추후 실제 데이터로 변경
  const getLetterById = (id: string) => {
    return dummyLetters.find((letter) => letter.id === Number(id)) ?? null;
  };

  const letter = getLetterById(letterId);

  //답장하는 페이지로 이동
  const handleGoReply = () => {
    router.push(`/write/${letterId}`);
  };

  //편지 상세 페이지로 이동
  const handleGoToDetail = () => {
    router.push(`/letters/${letterId}`);
  };

  // 모달 바깥 클릭 시 모달 닫기
  const onClickOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) onHandleModal();
  };

  // esc버튼 클릭 시 모달 닫기
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onHandleModal();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  //포인트 적립 애니메이션 제어
  const [showPoint, setShowPoint] = useState(false);

  useEffect(() => {
    setShowPoint(true);
    const timeout = setTimeout(() => setShowPoint(false), 1400);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        ref={overlay}
        className="fixed inset-0 z-100 sm:w-sm w-full -translate-x-1/2 left-1/2 bg-modal-overlay"
        onClick={onClickOverlay}
      >
        {showPoint && <PointPop />}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-11/12 sm:w-[22rem] p-6 bg-white rounded-[10px]
                    text-center flex flex-col cursor-pointer"
          onClick={handleGoToDetail}
        >
          <div className="flex w-full justify-between">
            <Txt size={18} weight="cm" className="text-green-49d">
              {/*TODO: dummy에 writer밖에 없어서 추후에 sender로 교체해야 함*/}
              TO. {letter?.writer}
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
            {letter?.createDt}
          </Txt>
          <Txt align="left" className="py-4">
            {letter?.content}
          </Txt>
          {/* TODO: letterId로 테이블에서 fileUrl 찾아와야 함 임시로 넣음 */}
          <LetterView fileUrl={"/images/letter.svg"} />
          <div className="flex w-full justify-between">
            <Txt
              align="left"
              weight="bold"
              className="text-green-49d underline"
              onClick={(e) => {
                e.stopPropagation();
                handleGoReply();
              }}
            >
              답장하러 가기
            </Txt>
            <Txt size={18} weight="cm" className="text-green-49d">
              From. {letter?.writer}
            </Txt>
          </div>
        </div>
      </div>
    </>
  );
}
