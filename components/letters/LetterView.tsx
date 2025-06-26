import Image from "next/image";
import { isVideoFile } from "@/constants/fileType";

type Props = {
  fileUrl: string;
};

export default function LetterView({ fileUrl }: Props) {
  return (
    <div className="w-full bg-gray-200 flex items-center justify-center rounded-md mb-6 overflow-auto">
      <div className="w-[80%] max-h-[30vh]">
        {isVideoFile(fileUrl) ? (
          <video
            src={fileUrl}
            width={100}
            height={120}
            controls
            className="rounded-md w-full h-auto object-contain"
          />
        ) : (
          <Image
            src={fileUrl}
            alt="첨부 이미지"
            width={100}
            height={120}
            className="rounded-md w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
