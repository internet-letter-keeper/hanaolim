"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Txt } from "@/components/atoms";
import { Modal } from "../common";

export default function AddFriendBtn() {
  const router = useRouter();

  const isLogggedIn = true;

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const navigateToSignIn = () => router.push("/auth/signIn");

  const addFriendHandler = () => {
    alert("군인 코드 입력 완료");
    closeModal();
  };

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
          <Input placeholder="코드 입력" usage="modal" className="mt-[20px]" />
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
