"use client";

import Image from "next/image";
import { useState } from "react";
import OnboardingCard from "@/components/OnboardingCard";
import Input from "@/components/atoms/Input";
import { Modal } from "@/components/common";

export default function OnboardingPage() {
  const [isModalOpened, setModalOpened] = useState(false);
  return (
    <div className="h-full flex flex-col gap-y-5 px-6 items-center justify-center pb-20">
      {/* TODO: 캐비넷의 친구 추가 모달이랑 겹치니까 따로 빼서 재사용하기  */}
      {/* 온보딩 컴포넌트도 버튼이고 모달에도 버튼이 있어서 따로 분리 */}
      {isModalOpened && (
        <Modal
          greenBtnText={"등록"}
          whiteBtnText={"취소"}
          onClickGreenBtn={() => alert("친구로 등록했습니다")}
          onClickWhiteBtn={() => setModalOpened(false)}
        >
          보고 싶은 군인을 등록해주세요
          <Input placeholder="코드 입력" className="mt-[20px]" />
        </Modal>
      )}
      <Image
        src={"/images/ic-hanaolim-logo.svg"}
        alt={"군장병을 위한 서비스 하나올림의 로고"}
        width={122}
        height={40}
      />
      <div className="h-14" />
      <OnboardingCard mode={"soldier"} />
      {/* setModalOpened를 props로 넘겨줌 */}
      <OnboardingCard
        mode={"viewer"}
        onRequestRegister={() => setModalOpened(true)}
      />
    </div>
  );
}
