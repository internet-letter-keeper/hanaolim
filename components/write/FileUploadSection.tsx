import Image from "next/image";
import { ChangeEvent, RefObject } from "react";
import { Txt } from "@/components/atoms";
import { FilePreview } from "@/components/letters";
import { uploadedFileType } from "@/types/letters";

type Props = {
  uploadedFile: uploadedFileType | null;
  isUploading: boolean;
  error: string | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: () => void;
  onFileUploadClick: () => void;
};

export default function FileUploadSection({
  uploadedFile,
  isUploading,
  error,
  fileInputRef,
  onFileChange,
  onFileDelete,
  onFileUploadClick,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between w-full items-center mt-5">
        {!uploadedFile && !isUploading && (
          <div className="flex flex-row gap-1 items-center">
            <button
              type="button"
              onClick={onFileUploadClick}
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

        {isUploading && (
          <div className="flex flex-row gap-2 items-center">
            <span className="text-blue-9a0 text-sm">업로드 중...</span>
          </div>
        )}

        {uploadedFile && <div />}

        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/*,video/*"
          className="hidden"
        />
      </div>

      {error && (
        <Txt size={12} weight="cm" className="text-red-a76" align="left">
          {error}
        </Txt>
      )}

      {uploadedFile && (
        <FilePreview uploadedFile={uploadedFile} onDelete={onFileDelete} />
      )}
    </div>
  );
}
