"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { Input, Txt } from "@/components/atoms";
import { useToast } from "@/contexts/toast/ToastContext";
import { useIsSEPhone } from "@/hooks/use-mobile";
import { postFriend } from "@/lib/actions/friend-actions";
import { Modal } from "../common";

export default function AddFriendBtn() {
  const router = useRouter();

  const { showToast } = useToast();

  const { data } = useSession();

  const isLogggedIn = !!data?.user.userId;

  const userId = data?.user.userId;

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const soldierCodeRef = useRef<HTMLInputElement>(null);

  const isSE = useIsSEPhone();
  const toastPosition = isSE
    ? "top-40 left-1/2 -translate-x-1/2"
    : "top-60 left-1/2 -translate-x-1/2";

  const addFriendHandler = async () => {
    if (soldierCodeRef.current?.value && userId) {
      const { success, message } = await postFriend(
        soldierCodeRef.current.value,
        userId
      );

      if (!success) {
        showToast(message, toastPosition, "error");
        return;
      }

      closeModal();
      showToast(message, toastPosition);
      router.refresh();
    }
  };

  const navigateToSignIn = () => router.push("/auth/signIn");

  return (
    <>
      {isModalOpened && isLogggedIn && (
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
          />
        </Modal>
      )}

      {isModalOpened && !isLogggedIn && (
        <Modal
          greenBtnText="로그인"
          whiteBtnText="닫기"
          onClickGreenBtn={navigateToSignIn}
          onClickWhiteBtn={closeModal}
        >
          로그인 후 이용해주세요
        </Modal>
      )}

      {/* 친구 추가 버튼 */}
      <button
        type="button"
        onClick={openModal}
        className="flex flex-col items-center whitespace-nowrap"
      >
        <div className="flex items-center border border-green-49d justify-center bg-white p-[6px] rounded-full">
          <div className="w-[37px] h-[37px] flex items-center justify-center text-green-49d">
            +
          </div>
        </div>

        <Txt className="mt-[14px] text-gray-353" weight="medium" size={12}>
          추가
        </Txt>
      </button>
    </>
  );
}
