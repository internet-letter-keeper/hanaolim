"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useRef,KeyboardEvent } from "react";
import OnboardingCard from "@/components/OnboardingCard";
import Input from "@/components/atoms/Input";
import { Modal } from "@/components/common";
import { useToast } from "@/contexts/toast/ToastContext";
import { postFriend } from "@/lib/actions/friend-actions";

export default function OnboardingPage() {
  const router = useRouter();

  const { data: session, update } = useSession();
  const { showToast } = useToast();
  const userId = session?.user.userId;

  const [isModalOpened, setModalOpened] = useState(false);

  const soldierCodeRef = useRef<HTMLInputElement>(null);

  const addFriendHandler = async () => {
    if (soldierCodeRef.current?.value && userId) {
      const { success, message, follow } = await postFriend(
        soldierCodeRef.current.value,
        userId
      );
      if (!success) {
        showToast(message, "top-60", "error");
        return;
      }
      showToast("친구 등록 완료", "top-60", "success");
      await update({ ...session.user, follow: follow });
      router.push(`/cabinet/${follow?.soldierId}`);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      addFriendHandler();
    }
  };

  return (
    <div className="h-full flex flex-col gap-y-5 px-6 items-center justify-center pb-20">
      {/* TODO: 캐비넷의 친구 추가 모달이랑 겹치니까 따로 빼서 재사용하기  */}
      {/* 온보딩 컴포넌트도 버튼이고 모달에도 버튼이 있어서 따로 분리 */}
      {isModalOpened && (
        <Modal
          greenBtnText={"등록"}
          whiteBtnText={"취소"}
          onClickGreenBtn={addFriendHandler}
          onClickWhiteBtn={() => setModalOpened(false)}
        >
          보고 싶은 군인을 등록해주세요
          <Input
            placeholder="코드 입력"
            usage="modal"
            className="mt-[20px]"
            maxLength={8}
            customRef={soldierCodeRef}
            onKeyDown={handleKeyDown}
          />
        </Modal>
      )}
      <Image
        src={"/icons/ic-hanaolim.svg"}
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
