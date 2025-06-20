import { requireAuth } from "@/utils/auth";
import { PointItemType } from "@/types/point";
import {
  getPointHistory,
  getPointSum,
} from "@/lib/actions/pointHistory-action";
import PointItem from "@/components/PointItem";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";

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
        <div>
          {/* 잔액/내역 구분선 */}
          <div className="h-[1px] bg-gray-530 mb-4 mt-7 mx-7" />
        </div>
        {/* 포인트 입금 내역 */}
        {pointList.map((item) => (
          <PointItem key={`${item.pointId}`} item={item} />
        ))}
      </div>
      {/* TODO: 무한스크롤 - 데이터 가져오는 중 */}
    </div>
  );
}
