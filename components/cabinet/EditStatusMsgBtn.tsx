"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Input } from "@/components/atoms";
import { Modal } from "@/components/common";
import { patchStatusMessage } from "@/lib/actions/friend-actions";

type Props = {
  soldierId: number;
  statusMessage: string | null;
};

export default function EditStatusMsgBtn({ soldierId, statusMessage }: Props) {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const router = useRouter();

  const statusMessageRef = useRef<HTMLInputElement>(null);

  const saveHandler = async () => {
    if (statusMessageRef.current?.value)
      await patchStatusMessage(soldierId, statusMessageRef.current.value);

    closeModal();
    router.refresh();
  };

  return (
    <>
      {isModalOpened && (
        <Modal
          greenBtnText="저장"
          whiteBtnText="취소"
          onClickGreenBtn={saveHandler}
          onClickWhiteBtn={closeModal}
        >
          <div className="flex items-center justify-center gap-[10px] mb-[10px] mr-[40px]">
            <Image
              src="/images/walkie-talkie.svg"
              alt="무전기 이미지"
              width={88}
              height={105}
            />
            상태 메시지를 <br /> 입력하세요
          </div>

          <Input
            customRef={statusMessageRef}
            usage="modal"
            placeholder="상태 메시지"
            defaultValue={statusMessage ?? ""}
            maxLength={20}
          />
        </Modal>
      )}

      <button onClick={openModal}>
        <Image
          src="/icons/ic-pencil.svg"
          alt="수정 아이콘"
          width={30}
          height={30}
        />
      </button>
    </>
  );
}
