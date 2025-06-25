"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useActionState, useEffect } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader, Modal } from "@/components/common";
import { FilePreview } from "@/components/letters";
import { CONTENT_MAX_COUNT } from "@/constants/limitContent";
import { postLetterReply } from "@/lib/actions/write-actions";
import { uploadedFileType } from "@/types/letters";

export default function LetterWritePage() {
  const [userName, setUserName] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { soldierId, letterId } = useParams();
  const idParam = searchParams.get("id");
  const nameParam = searchParams.get("name");

  // 편지 작성 액션 (답장용)
  const [letter, postLetterAction, isPending] = useActionState(
    async (_pre: unknown, formData: FormData) => {
      // soldierId와 parentLetterId 추가
      if (!soldierId || !letterId) {
        throw new Error("군인 아이디 또는 편지 아이디가 존재하지 않습니다.");
      }
      if (!idParam) throw new Error("아이디가 존재하지 않습니다.");
      formData.append("soldierId", soldierId.toString()); // 보내는 사람
      formData.append("parentLetterId", letterId.toString());
      formData.append("receiverId", idParam.toString()); // 받는 사람

      // 업로드된 파일이 있으면 FormData에 추가
      if (uploadedFile?.file) {
        formData.append("file", uploadedFile.file);
      }
      const result = await postLetterReply(formData);

      if (result?.success) {
        router.push(`/cabinet/${soldierId}`);
      }

      return result;
    },
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // 메모리 누수를 방지하기 위해 파일 삭제 시 메모리 해제
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
    <div className="flex flex-col flex-1">
      <BasicHeader />
      <div className="flex flex-col w-full px-4 relative min-h-[calc(100vh-64px)]">
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

        {/* form의 onSubmit으로 모달 처리 */}

        <form className="flex flex-col gap-3 w-full" action={postLetterAction}>
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

          <div className="flex flex-row justify-between w-full items-center mt-5">
            {/* 파일이 없을 때만 업로드 버튼 표시 */}
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

            {/* 파일이 있을 때는 빈 div로 공간 */}
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
              rounded="sm"
              weight="medium"
              className="w-20 py-1"
              disabled={isPending}
              textSize={16}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div>
          {/* 모달 */}
          {showModal && (
            <Modal
              greenBtnText="전송"
              whiteBtnText="수정"
              type="submit"
              disabled={isPending}
              onClickGreenBtn={() => {
                setShowModal(false);
              }}
              onClickWhiteBtn={() => {
                setShowModal(false);
              }}
            >
              한번 작성한 글은
              <br /> 수정 또는 삭제가 불가능합니다.
            </Modal>
          )}
        </form>
      </div>
    </div>
  );
}
