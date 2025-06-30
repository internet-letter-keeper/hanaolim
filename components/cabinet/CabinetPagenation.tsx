import Image from "next/image";
import Link from "next/link";
import { Txt } from "@/components/atoms";
import {
  getLettersByUserId,
  getLettersCntByUserId,
} from "@/lib/actions/letter-actions";
import { Cabinet } from ".";

type Props = {
  userId: number;
  soldierId: number;
  currentPage: number;
};

export default async function CabinetPagenation({
  userId,
  soldierId,
  currentPage,
}: Props) {
  const LETTERS_PER_PAGE = 7;

  const lettersCnt = await getLettersCntByUserId(userId);

  const totalPage =
    lettersCnt <= 7 ? 1 : Math.ceil(lettersCnt / LETTERS_PER_PAGE);

  const { data } = await getLettersByUserId(userId, +currentPage, lettersCnt);

  return (
    <div className="flex flex-col items-center gap-3 px-2">
      <div className="flex items-center justify-center gap-3 w-full">
        {/* 관물대 첫 페이지면 이전 페이지 버튼이 안 보이게 */}
        {currentPage > 1 ? (
          <Link href={`/cabinet/${soldierId}?page=${currentPage - 1}`} replace>
            <Image
              src="/icons/ic-next-page.svg"
              alt="관물대 이전 페이지로"
              width={20}
              height={20}
              className="w-5 scale-x-[-1]"
            />
          </Link>
        ) : (
          <div className="w-5" />
        )}

        {/* 관물대 */}
        <Cabinet soldierId={soldierId} letters={data} />

        {/* 관물대 마지막 페이지면 다음 페이지 버튼이 안 보이게 */}
        {currentPage < totalPage ? (
          <Link href={`/cabinet/${soldierId}?page=${currentPage + 1}`} replace>
            <Image
              src="/icons/ic-next-page.svg"
              alt="관물대 다음 페이지로"
              width={20}
              height={20}
              className="w-5"
            />
          </Link>
        ) : (
          <div className="w-5" />
        )}
      </div>

      {/* 페이지네이션 */}
      <Txt
        className="text-blue-9a0 bg-white-2f2 rounded-[10px] px-3 py-0.5"
        weight="medium"
        size={12}
      >
        {currentPage}/{totalPage}
      </Txt>
    </div>
  );
}
