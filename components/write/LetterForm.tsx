import { PropsWithChildren, useState } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { Modal } from "@/components/common";
import { CONTENT_MAX_COUNT } from "@/constants/limitContent";

type Props = {
  content: string;
  onContentChange: (value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  isFormValid: boolean;
  isUploading: boolean;
  nickname?: string;
  isReply?: boolean;
  onNicknameChange?: (value: string) => void;
};

/**
 * 편지 작성 폼
 * isReply == true이면 답장 작성 폼으로 사용
 */
export default function LetterForm({
  nickname = "",
  content,
  isReply = false,
  onNicknameChange,
  onContentChange,
  onSubmit,
  isPending,
  isFormValid,
  isUploading,
  children,
}: PropsWithChildren<Props>) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmitClick = () => {
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    onSubmit();
    setShowModal(false);
  };

  const handleCancelSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 답장이 아닌 경우에만 닉네임 입력 필드 표시 => 처음 편지쓰기 */}
      {!isReply && onNicknameChange && (
        <>
          <Input
            name="nickname"
            placeholder="닉네임"
            className="w-1/3 text-gray-939 placeholder:text-blue-9a0 text-[15px] pl-[18px]"
            maxLength={7}
            required
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
          />
          <Txt size={11} weight="cm" className="text-blue-9a0" align="left">
            ※ 닉네임은 관물대에서만 보여지며, 상대방에게는 실명이 전달됩니다.
          </Txt>
        </>
      )}

      <div className="flex flex-col w-full gap-2">
        <Input
          name="content"
          placeholder="내용을 입력하세요."
          tag="textarea"
          maxLength={CONTENT_MAX_COUNT}
          required
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
        />
        <Txt size={11} weight="cm" className="mr-2" align="right">
          {content.length}/{CONTENT_MAX_COUNT}
        </Txt>
      </div>

      {children}

      <div className="flex justify-end mt-4">
        <PrimaryButton
          title="전송"
          rounded="sm"
          weight="medium"
          className="w-20 py-1"
          disabled={isPending || !isFormValid || isUploading}
          textSize={16}
          onClick={handleSubmitClick}
        />
      </div>

      {showModal && (
        <Modal
          greenBtnText="전송"
          whiteBtnText="수정"
          type="submit"
          disabled={isPending}
          onClickGreenBtn={handleConfirmSubmit}
          onClickWhiteBtn={handleCancelSubmit}
        >
          한번 작성한 글은
          <br /> 수정 또는 삭제가 불가능합니다.
        </Modal>
      )}
    </div>
  );
}
