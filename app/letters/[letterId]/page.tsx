import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { PrimaryButton } from "@/components/atoms";
import BasicHeader from "@/components/common/BasicHeader";
import LettersDetail from "@/components/letters/LettersDetail";

type Props = {
  params: { letterId: string };
};

export default async function LetterDetailPage({ params }: Props) {
  const { letterId } = params;

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
  });

  return (
    <>
      <BasicHeader />

      <div className="py-4 flex justify-center">
        <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
          <LettersDetail
            lettersDetail={{
              content: letter.content,
              fileUrl: letter.fileUrl ?? "",
              createDate: letter.createDate,
              senderNickname: letter.nickname ?? "",
              senderUserName: letter.User_Letter_senderIdToUser.userName,
              receiverName: letter.User_Letter_receiverIdToUser.userName,
            }}
          />
        </div>
      </div>

      {!reply && (
        <div className="flex justify-end px-6 mt-2">
          <a href={`/write/${letter.letterId}`}>
            <PrimaryButton title="답장하기" className="px-3 w-28 py-[5px]" />
          </a>
        </div>
      )}

      {reply && (
        <div className="flex justify-center mt-4">
          <div className="bg-white shadow-sm p-4 w-[90%] max-w-md">
            <LettersDetail
              lettersDetail={{
                content: letter.content,
                fileUrl: letter.fileUrl ?? "",
                createDate: letter.createDate,
                senderNickname: letter.nickname ?? "",
                senderUserName: letter.User_Letter_senderIdToUser.userName,
                receiverName: letter.User_Letter_receiverIdToUser.userName,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
