"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Input, Txt } from "@/components/atoms";
import { Modal } from "@/components/common";
import { STATUS_MAX_COUNT } from "@/constants/limitContent";
import { useToast } from "@/contexts/toast/ToastContext";
import { patchStatusMessage } from "@/lib/actions/friend-actions";
import { SoldierUserInfo } from "@/types/common/profile";

type Props = {
  soldierInfo: SoldierUserInfo;
};

export default function EditStatusMsgBtn({ soldierInfo }: Props) {
  const { soldierId, statusMessage } = soldierInfo;

  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const { showToast } = useToast();

  const openModal = () => setModalOpened(true);

  const closeModal = () => setModalOpened(false);

  const router = useRouter();

  const statusMessageRef = useRef<HTMLInputElement>(null);

  const saveHandler = async () => {
    if (statusMessageRef.current?.value) {
      const { success, message } = await patchStatusMessage(
        soldierId,
        statusMessageRef.current.value
      );
      if (!success) {
        showToast(message, "", "error");
      }
    }

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
              className="w-22 h-[105px]"
            />
            상태 메시지를 <br /> 입력하세요
          </div>
          <div className="flex flex-col w-full gap-2">
            <Input
              customRef={statusMessageRef}
              usage="modal"
              placeholder="상태 메시지"
              defaultValue={statusMessage ?? ""}
              maxLength={STATUS_MAX_COUNT}
              onChange={(e) => {
                setCount(e.target.value.length);
              }}
            />
            <Txt size={11} weight="cm" className="mr-2 -mb-2" align="right">
              {count}/{STATUS_MAX_COUNT}
            </Txt>
          </div>
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
