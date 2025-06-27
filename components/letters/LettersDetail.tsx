import Image from "next/image";
import { Txt } from "@/components/atoms";
import { isVideoFile } from "@/constants/fileType";
import { getLetterDetail } from "@/lib/actions/letter-actions";

type Props = {
  letter: Awaited<ReturnType<typeof getLetterDetail>>["data"];
};

export default function LettersDetail({ letter }: Props) {
  if (!letter) return null;

  const {
    fileUrl,
    nickname,
    senderName,
    receiverName,
    content,
    createDate,
    parentLetterId,
  } = letter;

  return (
    <div className="flex flex-col gap-4 w-full bg-white shadow-sm p-5 rounded-[10px]">
      {!parentLetterId && (
        <div className="flex justify-center gap-4 mb-3">
          <Image
            src="/images/byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image
            src="/images/letter.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
        </div>
      )}

      {/* 받는 사람 */}
      <div className="flex flex-col gap-1">
        <Txt size={18} weight="cm" align="left" className="text-green-49d">
          To. {receiverName}
        </Txt>

        <Txt size={12} weight="cm" align="left" className="text-blue-9a0">
          {createDate?.toLocaleString()}
        </Txt>
      </div>

      {/* 편지 내용 */}
      <Txt
        size={15}
        weight="cm"
        align="left"
        className="break-words whitespace-pre-wrap"
      >
        {content}
      </Txt>

      {/* 첨부파일 */}
      {fileUrl && (
        <div className="w-full bg-gray-200 flex items-center justify-center rounded-md mb-4">
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
      )}

      {/* 보내는 사람 */}
      {/* 보내는 사람 닉네임 없을 경우(군인) : 답장 */}
      <Txt size={18} weight="cm" align="right" className="text-green-49d">
        From. {senderName}
        {nickname ? ` (${nickname})` : ""}
      </Txt>
    </div>
  );
}
