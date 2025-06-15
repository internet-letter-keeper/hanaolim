"use client";

import { useRef, useEffect, MouseEventHandler, PropsWithChildren } from "react";
import { PrimaryButton, Txt } from "../atoms";

type Props = {
  greenBtnText: string;
  whiteBtnText: string;
  onClickGreenBtn: () => void;
  onClickWhiteBtn: () => void;
};

/**
 * 공용 모달 컴포넌트
 * @param greenBtnText 초록색 버튼의 텍스트
 * @param whiteBtnText 흰색 버튼의 텍스트
 * @param onClickGreenBtn 초록색 버튼 클릭 이벤트 함수
 * @param onClickWhiteBtn 흰색 버튼의 클릭 이벤트 함수
 * @children 하단 두 버튼의 상단 요소. 텍스트/이미지/input 모두 가능. Txt 컴포넌트로 감싸놨으니 텍스트는 더이상 감쌀 필요 없음.
 */
export default function Modal({
  greenBtnText,
  whiteBtnText,
  onClickGreenBtn,
  onClickWhiteBtn,
  children,
}: PropsWithChildren<Props>) {
  const overlay = useRef<HTMLDivElement>(null);

  const wrapper = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 모달 닫기
  const onClickOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) onClickWhiteBtn();
  };

  // esc버튼 클릭 시 모달 닫기
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClickWhiteBtn();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-10 bg-modal-overlay"
      onClick={onClickOverlay}
    >
      <div
        ref={wrapper}
        className="absolute w-11/12 sm:w-[22rem] p-[24px] bg-white rounded-[10px] text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      >
        {/* 하단 두 버튼의 상단 영역 */}
        <Txt weight="cm" size={18}>
          {children}
        </Txt>

        {/* 흰색 버튼, 초록색 버튼 */}
        <div className="flex gap-[12px] mt-[20px]">
          <PrimaryButton
            title={whiteBtnText}
            color="white"
            textSize={16}
            weight="medium"
            onClick={onClickWhiteBtn}
            className="h-[40px]"
          />
          <PrimaryButton
            title={greenBtnText}
            color="green"
            textSize={16}
            weight="medium"
            onClick={onClickGreenBtn}
            className="h-[40px]"
          />
        </div>
      </div>
    </div>
  );
}
