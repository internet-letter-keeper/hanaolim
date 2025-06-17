import Image from "next/image";

type Props = {
  fileUrl: string;
};

export default function LetterView({ fileUrl }: Props) {
  return (
    <div className="w-full bg-gray-200 flex items-center justify-center rounded-md mb-6">
      {fileUrl.endsWith(".mp4") || fileUrl.endsWith(".webm") ? (
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
