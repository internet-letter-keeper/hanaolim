"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { ChangeEvent } from "react";
import { IconName } from "@/types/common/icons";
import { uploadedFileType } from "@/types/letters";
import { Input, PrimaryButton, Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { FilePreview, IconPicker } from "@/components/letters";

export default function WritePage() {
  const [selectedIcon, setSelectedIcon] = useState<IconName>("face");
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
            별돌이&nbsp;
          </Txt>
          <Txt size={20} weight="bold">
            군인에게 편지를 작성해주세요!
          </Txt>
        </div>

        <div className="flex flex-col gap-[14px] mb-8">
          <Txt size={16} weight="cm" align="left">
            관물대에 넣을 물건을 선택해주세요.
          </Txt>
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
        </div>

        <form className="flex flex-col gap-3 w-full">
          <Input
            placeholder="닉네임"
            className="w-1/3 text-gray-939 placeholder:text-blue-9a0 text-[15px] pl-[18px]"
            maxLength={7} // 7글자 제한
          />
          <Input
            placeholder="내용을 입력하세요."
            tag="textarea"
            maxLength={500} // 500자 제햔
          />
        </form>

        <div className="flex flex-row justify-between w-full items-center mt-5">
          {/* 파일이 없을 때만 업로드 버튼 표시 */}
          {!uploadedFile && (
            <div className="flex flex-row gap-1 items-center">
              <button
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
        <div className="absolute bottom-0.5 right-0.5 sm:bottom-1.5 sm:right-1 md:bottom-7 md:right-4 ">
          <PrimaryButton
            title="전송"
            type="submit"
            rounded="sm"
            weight="medium"
            className="w-20 py-1"
            textSize={16}
          />
        </div>
      </div>
    </div>
  );
}
