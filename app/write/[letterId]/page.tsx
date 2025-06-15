"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChangeEvent } from "react";
import { uploadedFileType } from "@/types/letters";
import { Button, Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { FilePreview } from "@/components/letters";

export default function LetterWritePage() {
  const [uploadedFile, setUploadedFile] = useState<uploadedFileType | null>(
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

  return (
    <div className="flex flex-col">
      <BasicHeader />
      <div className="flex flex-col w-full px-4">
        <div className="flex items-center justify-center gap-2 mt-2">
          <Image
            src="/images/ic-byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image
            src="/images/ic-letter.svg"
            alt="편지"
            width={50}
            height={50}
          />
        </div>

        <div className="flex mt-[14px] mb-13 items-center justify-center">
          <Txt size={20} weight="bold" className="text-green-49d">
            별돌이&nbsp;
          </Txt>
          <Txt size={20} weight="bold">
            군인에게 편지를 작성해주세요!
          </Txt>
        </div>
        <form className="flex flex-col gap-3 w-full">
          <Input
            placeholder="내용을 입력하세요."
            inputType="auth"
            tag="textarea"
            maxLength={500} // 500자 제햔
            className="flex w-full h-[230px] text-[15px] rounded-[10px] py-[10px] px-[18px] bg-white-fff text-gray-939 placeholder:text-blue-9a0 focus:outline-none"
          />
        </form>

        <div className="flex flex-row justify-between w-full items-center mt-5">
          {/* 파일이 없을 때만 업로드 버튼 표시 */}
          {!uploadedFile && (
            <Button
              onClick={onClickImage}
              className="cursor-pointer flex w-7 h-7 items-center justify-center rounded-[5px] bg-white-fff shadow-[0px_0px_5px_rgba(0,0,0,0.15)]"
            >
              <Image
                src="/icons/ic-picture.svg"
                alt="사진"
                width={20}
                height={20}
                className="w-auto h-auto"
              />
            </Button>
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

          <PrimaryButton
            title="전송"
            type="submit"
            rounded="sm"
            className="w-20 py-1 font-bold"
          />
        </div>

        {uploadedFile && (
          <FilePreview
            uploadedFile={uploadedFile}
            onDelete={handleDeleteFile}
          />
        )}
      </div>
    </div>
  );
}
