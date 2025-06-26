import Image from "next/image";
import Link from "next/link";
import { Txt } from "../atoms";
import FavoriteToggle from "./FavoriteToggle";

type Props = {
  letter: any;
  currentUserId: number;
  box: "mine" | "friend";
};

export default function LettersItem({ letter, currentUserId, box }: Props) {
  const {
    letterId,
    receiverId,
    senderName,
    receiverName,
    content,
    createDate,
    readDate,
  } = letter;

  const isRead = !!readDate;
  const formattedDate = new Date(createDate).toLocaleDateString();

  return (
    <Link
      href={`/letters/${letterId}`}
      className="w-full bg-white border rounded-[10px] border-[#209B98] p-3"
    >
      <div className="flex justify-between items-start">
        <Txt
          size={20}
          weight="cm"
          className={isRead ? "text-[#AAAAAA]" : "text-gray-353"}
        >
          {currentUserId === receiverId ? senderName : receiverName}
        </Txt>
        <Txt size={12} className="text-blue-9a0">
          {formattedDate}
        </Txt>
      </div>

      <Txt
        size={15}
        align="left"
        className="text-blue-9a0 mt-1 line-clamp-2 break-words"
      >
        {content}
      </Txt>

      <div className="flex justify-between items-center w-full mt-2">

        {/* 답장 버튼 영역 */}
        {(box === "mine" && !letter.hasReply) ||
        (box === "friend" && letter.hasReply) ? (
          <div className="inline-flex items-center gap-1 rounded-[5px] border border-red-a76 px-2 py-0.5">
            <Image
              src="/icons/ic-isReply.svg"
              alt={box === "mine" ? "답장하기" : "답장도착"}
              width={14}
              height={15}
            />
            <Txt size={12} className="text-red-a76 whitespace-nowrap">
              {box === "mine" ? "답장하기" : "답장도착"}
            </Txt>
          </div>
        ) : (
          <div />
        )}
        <FavoriteToggle letter={letter} currentUserId={currentUserId} />
      </div>
    </Link>
  );
}
