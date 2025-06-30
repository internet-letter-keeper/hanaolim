import Image from "next/image";
import { isVideoFile } from "@/constants/fileType";

type Props = {
  fileUrl: string;
};

export default function LetterView({ fileUrl }: Props) {
  return (
    <div className="w-full bg-white-fff flex items-center justify-center mb-6 z-20">
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
  );
}
