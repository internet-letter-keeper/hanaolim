import Link from "next/link";
import EmptyState from "@/components/EmptyList";
import PointItem from "@/components/PointItem";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import {
  getPointHistory,
  getPointSum,
} from "@/lib/actions/pointHistory-action";
import { PointItemType } from "@/types/point";
import { requireAuth } from "@/utils/auth";

export default async function PointHistoryPage() {
  const session = await requireAuth();

  const soldierId = session?.user.soldier.soldierId!;
  const pointSum = await getPointSum(soldierId);
  const pointList: PointItemType[] = await getPointHistory(soldierId);

  return (
    <div className="flex flex-col min-h-screen">
      <BasicHeader title="포인트 내역 조회" />
      <Txt size={25} weight="bold" align="center" className="py-14">
        {/* 포인트 잔액 */}
        {pointSum.toLocaleString()} 원
      </Txt>
      <div className="flex-1 flex flex-col bg-white-fff -m-4 pb-8">
        {/* 구분선 - 포인트 입금 내역 */}
        {pointList.length > 0 ? (
          <>
            <div className="h-[1px] bg-gray-530 mb-4 mt-7 mx-7" />
            {pointList.map((item) => (
              <PointItem key={`${item.pointId}`} item={item} />
            ))}
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-6">
            <EmptyState>
              포인트 내역이 없어요 <br /> 편지를 읽고 포인트를 받아 보세요!{" "}
              <br />
            </EmptyState>
            <Link
              href={`/cabinet/${soldierId}`}
              className="bg-green-49d text-white-fff p-2 rounded-[8px] text-[14px]"
            >
              편지 읽으러 가기
            </Link>
          </div>
        )}
      </div>
      {/* TODO: 무한스크롤 - 데이터 가져오는 중 */}
    </div>
  );
}
