import { X } from "lucide-react";
import Image from "next/image";
import Txt from "@/components/atoms/Text";
import { uploadedFileType } from "@/app/write/page";

type Props = {
  uploadedFile: uploadedFileType;
  onDelete: () => void;
};

export const FilePreview = ({ uploadedFile, onDelete }: Props) => {
  return (
    <div className="w-full mt-4 p-4">
      <div className="flex items-start gap-3">
        {uploadedFile.type === "image" ? (
          <div className="relative">
            <Image
              src={uploadedFile.url}
              alt="업로드된 이미지"
              width={120}
              height={120}
              className="object-cover rounded-[5px]"
            />
          </div>
        ) : (
          <div className="relative">
            <video
              src={uploadedFile.url}
              width={120}
              height={120}
              controls
              className="object-cover rounded-[5px]"
            />
          </div>
        )}

        {/* 파일 정보 */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start mt-2 gap-1">
              <div className="max-w-[200px]">
                <Txt
                  size={14}
                  weight="cm"
                  className="text-gray-939 truncate block"
                >
                  {uploadedFile.file.name}
                </Txt>
              </div>
              <Txt size={12} weight="cm" className="text-gray-500">
                {uploadedFile.type === "image" ? "이미지" : "동영상"}
              </Txt>
            </div>
            <X onClick={onDelete} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
