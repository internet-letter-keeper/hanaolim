import { notFound } from "next/navigation";
import { PrimaryButton } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";
import prisma from "@/lib/db";

type Props = {
  params: Promise<{ letterId: number }>;
};

export default async function LetterDetailPage({ params }: Props) {
  const { letterId } = await params;

  const letter = await prisma.letter.findUnique({
    where: { letterId: +letterId },
    include: {
      User_Letter_senderIdToUser: true,
      User_Letter_receiverIdToUser: true,
    },
  });

  if (!letter) return notFound();

  const reply = await prisma.letter.findFirst({
    where: { parentLetterId: letter.letterId },
    include: {
      User_Letter_senderIdToUser: true,
      User_Letter_receiverIdToUser: true,
    },
  });

  return (
    <>
      <BasicHeader />

      {/* 원본 편지 */}
      <div className="py-4 flex justify-center">
        <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
          <LettersDetail
            lettersDetail={{
              content: letter.content,
              fileUrl: letter.fileUrl ?? "",
              createDate: letter.createDate.toLocaleString("ko-KR", {
                dateStyle: "medium",
                timeStyle: "short",
              }),
              senderNickname: letter.nickname ?? "",
              senderUserName: letter.User_Letter_senderIdToUser.userName,
              receiverName: letter.User_Letter_receiverIdToUser.userName,
            }}
          />
        </div>
      </div>

      {/* 답장 없을 경우 버튼 */}
      {!reply && (
        <div className="flex justify-end px-6 mt-2">
          <a href={`/write/${letter.receiverId}/${letter.letterId}`}>
            <PrimaryButton title="답장하기" className="px-3 w-28 py-[5px]" />
          </a>
        </div>
      )}

      {/* 답장 있을 경우 보여줌 */}
      {reply && (
        <div className="flex justify-center mt-4">
          <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
            <LettersDetail
              lettersDetail={{
                content: reply.content,
                fileUrl: reply.fileUrl ?? "",
                createDate: reply.createDate.toLocaleString("ko-KR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }),
                senderNickname: reply.nickname ?? "",
                senderUserName: reply.User_Letter_senderIdToUser.userName,
                receiverName: reply.User_Letter_receiverIdToUser.userName,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
