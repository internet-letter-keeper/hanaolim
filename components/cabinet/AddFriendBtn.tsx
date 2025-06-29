"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Txt } from "@/components/atoms";
import { AddFriendModal, Modal } from "../common";

export default function AddFriendBtn() {
  const router = useRouter();

  const { data } = useSession();
  const isLogggedIn = !!data?.user.userId;

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const navigateToSignIn = () =>
    router.push(
      `/auth/signIn?callbackUrl=${encodeURIComponent(window.location.origin + window.location.pathname)}`
    );

  return (
    <>
      {isModalOpened && isLogggedIn && (
        <AddFriendModal closeModal={closeModal} />
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
        <div className="flex items-center size-13 border border-green-49d justify-center bg-white rounded-full">
          <Txt className="text-green-49d">+</Txt>
        </div>

        <Txt className="mt-[14px] text-gray-353" weight="medium" size={12}>
          추가
        </Txt>
      </button>
    </>
  );
}
