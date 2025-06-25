"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useActionState, useEffect } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader, Modal } from "@/components/common";
import { FilePreview, IconPicker } from "@/components/letters";
import { CONTENT_MAX_COUNT } from "@/constants/limitContent";
import { postLetter } from "@/lib/actions/write-actions";
import { IconName } from "@/types/common/icons";
import { uploadedFileType } from "@/types/letters";
import { getIconIdByName } from "@/utils/icon";

export default function WritePage() {
  const [userName, setUserName] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<IconName>("face");
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const { soldierId } = useParams();
  const nameParam = searchParams.get("name");

  if (!soldierId) {
    throw new Error("군인 아이디가 존재하지 않습니다.");
  }

  const [letter, postLetterAction, isPending] = useActionState(
    async (_pre: unknown, formData: FormData) => {
      // soldierId 추가
      formData.append("soldierId", soldierId.toString());

      // 선택된 아이콘 ID 추가
      const iconId = getIconIdByName(selectedIcon);
      formData.append("iconId", iconId.toString());

      // 업로드된 파일이 있으면 FormData에 추가
      if (uploadedFile?.file) {
        formData.append("file", uploadedFile.file);
      }

      const result = await postLetter(formData);

      if (result?.success) {
        router.push(`/cabinet/${soldierId}`);
      }

      return result;
    },
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form submit 처리 (모달 띄우기)
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 form submit 방지

    const formData = new FormData(e.currentTarget);
    setPendingFormData(formData);
    setShowModal(true);
  };

  // 모달에서 전송 확인
  const handleConfirmSubmit = () => {
    if (pendingFormData) {
      postLetterAction(pendingFormData);
      setShowModal(false);
      setPendingFormData(null);
    }
  };

  // 모달에서 수정 선택
  const handleCancelSubmit = () => {
    setShowModal(false);
    setPendingFormData(null);
  };

  const onClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      setUploadedFile({
        file,
        url,
        type: fileType,
      });
    }
  };

  // 파일 삭제 시 메모리 해제
  const handleDeleteFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile.url);
      setUploadedFile(null);
    }
  };

  useEffect(() => {
    if (nameParam) {
      try {
        const decodedName = decodeURIComponent(nameParam);
        setUserName(decodedName);
      } catch (error) {
        console.error("Name decoding failed:", error);
        setUserName("별돌이");
      }
    } else {
      setUserName("별돌이");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col">
      <BasicHeader />
      <div className="flex flex-col w-full px-4 relative min-h-[calc(100dvh-64px)]">
        <div className="flex items-center justify-center gap-2 mt-2">
          <Image
            src="/images/byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image src="/images/letter.svg" alt="편지" width={50} height={50} />
        </div>

        <div className="flex mt-[14px] mb-13 items-center justify-center whitespace-nowrap">
          <Txt size={20} weight="bold" className="text-green-49d">
            {userName}&nbsp;
          </Txt>
          <Txt size={20} weight="bold">
            님에게 편지를 작성해주세요!
          </Txt>
        </div>

        <div className="flex flex-col gap-[14px] mb-8">
          <Txt size={16} weight="cm" align="left">
            관물대에 넣을 물건을 선택해주세요.
          </Txt>
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
        </div>

        {/* form의 onSubmit으로 모달 처리 */}
        <form
          className="flex flex-col gap-3 w-full"
          onSubmit={handleFormSubmit}
        >
          <Input
            name="nickname"
            placeholder="닉네임"
            className="w-1/3 text-gray-939 placeholder:text-blue-9a0 text-[15px] pl-[18px]"
            maxLength={7}
            required
          />
          <Txt size={11} weight="cm" className="text-blue-9a0" align="left">
            ※ 닉네임은 관물대에서만 보여지며, 상대방에게는 실명이 전달됩니다.
          </Txt>
          <div className="flex flex-col w-full gap-2">
            <Input
              name="content"
              placeholder="내용을 입력하세요."
              tag="textarea"
              maxLength={CONTENT_MAX_COUNT}
              required
              onChange={(e) => {
                setCount(e.target.value.length);
              }}
            />
            <Txt size={11} weight="cm" className="mr-2" align="right">
              {count}/{CONTENT_MAX_COUNT}
            </Txt>
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            {!uploadedFile && (
              <div className="flex flex-row gap-1 items-center">
                <button
                  type="button"
                  onClick={onClickImage}
                  className="flex w-7 h-7 items-center justify-center rounded-[5px] bg-white-fff shadow-[0px_0px_5px_rgba(0,0,0,0.15)]"
                >
                  <Image
                    src="/icons/ic-picture.svg"
                    alt="사진"
                    width={20}
                    height={20}
                    className="w-auto h-auto"
                  />
                </button>
                <Txt size={12} weight="cm" className="text-blue-9a0">
                  ※ 최대 1개의 파일만 첨부할 수 있습니다.
                </Txt>
              </div>
            )}

            {uploadedFile && <div />}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden"
            />
          </div>
          {uploadedFile && (
            <FilePreview
              uploadedFile={uploadedFile}
              onDelete={handleDeleteFile}
            />
          )}
          <div className="flex justify-end mt-4">
            <PrimaryButton
              title="전송"
              type="submit"
              rounded="sm"
              weight="medium"
              className="w-20 py-1"
              disabled={isPending}
              textSize={16}
            />
          </div>
        </form>
      </div>

      {/* 모달 */}
      {showModal && (
        <Modal
          greenBtnText="전송"
          whiteBtnText="수정"
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
