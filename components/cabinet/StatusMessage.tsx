"use client";

import Image from "next/image";
import { useState } from "react";
import { Input, Txt } from "../atoms";
import { Modal } from "../common";

type Props = {
  isMyCabinet: boolean;
  message: string;
};

export default function StatusMessage({ message, isMyCabinet }: Props) {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const saveHandler = () => {
    alert("상태 메시지 저장 버튼 클릭");
    closeModal();
  };

  return (
    <div>
      {isModalOpened && (
        <Modal
          greenBtnText="저장"
          whiteBtnText="취소"
          onClickGreenBtn={saveHandler}
          onClickWhiteBtn={closeModal}
        >
          <div className="flex items-center justify-center gap-[10px] mb-[10px] mr-[40px]">
            <Image
              src="/images/ic-walkie-talkie.svg"
              alt="무전기 이미지"
              width={88}
              height={105}
            />
            상태 메시지를 <br /> 입력하세요
          </div>

          <Input
            placeholder="상태 메시지"
            inputType="modal"
            defaultValue={message}
            maxLength={20}
          />
        </Modal>
      )}

      <div className="flex px-[16px] py-[8px] items-center border bg-blue-0f5 border-blue-af0 rounded-[15px]">
        <Image
          src="/images/ic-walkie-talkie.svg"
          alt="무전기 이미지"
          width={32}
          height={39}
        />

        <Txt className="w-full ml-[7px] text-gray-353 truncate" align="left">
          {message}
        </Txt>

        {isMyCabinet && (
          <button
            className="bg-blue-af0 cursor-pointer p-[2px] rounded-[5px]"
            onClick={openModal}
          >
            <Image
              src="/icons/ic-pencil.svg"
              alt="수정 아이콘"
              width={25}
              height={25}
            />
          </button>
        )}
      </div>
    </div>
  );
}
