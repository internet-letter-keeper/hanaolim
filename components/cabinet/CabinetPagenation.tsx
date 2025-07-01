import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center">
        {/* 관물대 첫 페이지면 이전 페이지 버튼이 안 보이게 */}
        {currentPage > 1 ? (
          <Link href={`/cabinet/${soldierId}?page=${currentPage - 1}`} replace>
            <ChevronLeft color="lightgray" size={40} />
          </Link>
        ) : (
          <div>
            <ChevronLeft size={40} className="invisible" />
          </div>
        )}

        {/* 관물대 */}
        <Cabinet soldierId={soldierId} letters={data} />

        {/* 관물대 마지막 페이지면 다음 페이지 버튼이 안 보이게 */}
        {currentPage < totalPage ? (
          <Link href={`/cabinet/${soldierId}?page=${currentPage + 1}`} replace>
            <ChevronRight color="lightgray" size={40} />
          </Link>
        ) : (
          <div>
            <ChevronRight size={40} className="invisible" />
          </div>
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
