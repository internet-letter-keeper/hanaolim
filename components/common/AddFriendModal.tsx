"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, KeyboardEvent } from "react";
import { useToast } from "@/contexts/toast/ToastContext";
import { postFriend } from "@/lib/actions/friend-actions";
import { Modal } from ".";
import { Input } from "../atoms";

type Props = {
  closeModal: () => void;
};

export default function AddFriendModal({ closeModal }: Props) {
  const { data } = useSession();
  const userId = data?.user.userId;
  const isSoldier = data?.user.soldier;

  const router = useRouter();
  const { showToast } = useToast();

  const toastPosition = "top-5/6";

  const soldierCodeRef = useRef<HTMLInputElement>(null);

  const addFriendHandler = async () => {
    const typedCodeValue = soldierCodeRef.current?.value;

    if (isSoldier && isSoldier.code === typedCodeValue) {
      showToast("나의 코드예요", toastPosition, "error");
      return;
    }

    if (typedCodeValue && userId) {
      const { success, message } = await postFriend(typedCodeValue, userId);

      if (!success) {
        showToast(message, toastPosition, "error");
        return;
      }

      showToast(message, toastPosition);
      router.refresh();
      closeModal();
    }
  };

  const handleEnterKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") addFriendHandler();
  };

  return (
    <Modal
      greenBtnText="등록"
      whiteBtnText="닫기"
      onClickGreenBtn={addFriendHandler}
      onClickWhiteBtn={closeModal}
    >
      보고 싶은 군인을 등록해주세요
      <Input
        placeholder="코드 입력"
        usage="modal"
        className="mt-[20px]"
        maxLength={8}
        customRef={soldierCodeRef}
        onKeyDown={handleEnterKeyDown}
      />
    </Modal>
  );
}
