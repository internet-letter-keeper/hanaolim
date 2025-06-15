import { X } from "lucide-react";
import Image from "next/image";
import { uploadedFileType } from "@/types/letters";
import { Txt } from "@/components/atoms";

type Props = {
  uploadedFile: uploadedFileType;
  onDelete: () => void;
};

const mediaStyle = "object-cover rounded-[5px] w-[100px] h-[100px]";

export default function FilePreview({ uploadedFile, onDelete }: Props) {
  const {
    file: { name },
    url,
    type,
  } = uploadedFile;
  return (
    <div className="w-full mt-4 p-4">
      <div className="flex items-start gap-3">
        {type === "image" ? (
          <Image
            src={url}
            alt="업로드된 이미지"
            width={100}
            height={100}
            className={mediaStyle}
          />
        ) : (
          <video
            src={url}
            width={100}
            height={100}
            controls
            className={mediaStyle}
          />
        )}

        {/* 파일 정보 */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start mt-2 gap-1">
              <div className="max-w-[200px]">
                <Txt size={14} weight="cm" className="truncate block">
                  {name}
                </Txt>
              </div>
              <Txt size={12} weight="cm" className="text-gray-500">
                {type === "image" ? "이미지" : "동영상"}
              </Txt>
            </div>
            <X onClick={onDelete} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
