import Image from "next/image";
import Link from "next/link";
import { Txt } from "../atoms";

type Props = {
  letter: any;
  currentUserId: number;
  box: "mine" | "friend";
};

export default function LettersItem({ letter, currentUserId, box }: Props) {
  const {
    letterId,
    senderId,
    receiverId,
    senderName,
    receiverName,
    content,
    createDate,
    readDate,
    isFavorite,
    hasReply,
  } = letter;

  const isRead = !!readDate;
  const formattedDate = new Date(createDate).toLocaleDateString();

  const shouldShowReplyButton = box === "mine" && !hasReply;

  return (
    <div className="flex w-full bg-white mx-auto">
      <Link
        href={`/letters/${letterId}`}
        className="w-full block border rounded-[10px] border-[#209B98] pb-3 p-3 -mt-3"
      >
        <div className="flex justify-between items-start">
          <Txt
            size={20}
            weight="cm"
            className={isRead ? "text-[#AAAAAA]" : "text-gray-353"}
          >
            {currentUserId === receiverId ? senderName : receiverName}
          </Txt>
          <span className="text-[12px] text-blue-9a0 whitespace-nowrap">
            {formattedDate}
          </span>
        </div>

        <Txt
          size={15}
          align="left"
          className="text-blue-9a0 mt-1 line-clamp-2 break-words"
        >
          {content}
        </Txt>

        <div className="flex justify-between items-center w-full mt-2">
          {shouldShowReplyButton && (
            <div className="flex items-center gap-1 rounded-full border border-red-a76 px-2 py-0.5">
              <Image
                src="/icons/ic-isReply.svg"
                alt="답장하기"
                width={14}
                height={15}
              />
              <Txt size={12} className="text-red-a76">
                답장하기
              </Txt>
            </div>
          )}

          {!shouldShowReplyButton &&
            box === "friend" &&
            senderId === currentUserId &&
            hasReply && (
              <div className="flex items-center gap-1 rounded-full border border-red-a76 px-2 py-0.5">
                <Image
                  src="/icons/ic-isReply.svg"
                  alt="답장도착"
                  width={14}
                  height={15}
                />
                <Txt size={12} className="text-red-a76">
                  답장도착
                </Txt>
              </div>
            )}

          {!shouldShowReplyButton && (!hasReply || box === "mine") && <div />}

          <Image
            src={
              isFavorite
                ? "/icons/ic-favorite-colered.svg"
                : "/icons/ic-favorite-none.svg"
            }
            alt="즐겨찾기"
            width={20}
            height={20}
          />
        </div>
      </Link>
    </div>
  );
}
