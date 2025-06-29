import Link from "next/link";
import EmptyState from "@/components/EmptyState";
import PointItem from "@/components/PointItem";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { ERROR_MESSAGES } from "@/constants/message";
import {
  getPointHistory,
  getPointSum,
} from "@/lib/actions/pointHistory-action";
import { auth } from "@/lib/auth";

export default async function PointHistoryPage() {
  const session = await auth();

  const soldierId = session?.user.soldier.soldierId;

  if (!soldierId) throw new Error(ERROR_MESSAGES.SOLDIER.NOT_FOUND);

  const {
    success: pointSumSuccess,
    message: pointSumsMessage,
    data: pointSum,
  } = await getPointSum(soldierId);

  if (!pointSumSuccess) {
    throw new Error(pointSumsMessage);
  }

  const {
    success,
    message,
    data: pointList,
  } = await getPointHistory(soldierId);

  const safePointList = pointList || [];

  if (!success || !pointList) {
    throw new Error(message);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BasicHeader title="포인트 내역 조회" />
      <Txt size={25} weight="bold" align="center" className="py-14">
        {/* 포인트 잔액 */}
        {pointSum?.toLocaleString()} 원
      </Txt>
      <div className="flex-1 flex flex-col bg-white-fff -m-4 pb-8">
        {/* 구분선 - 포인트 입금 내역 */}
        {safePointList.length > 0 ? (
          <>
            <div className="h-[1px] bg-gray-530 mb-4 mt-7 mx-7" />
            {safePointList.map((item) => (
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
              className="bg-green-49d p-3 rounded-[8px] inline-flex items-center justify-center"
            >
              <Txt
                className="text-white leading-none"
                size={14}
                align="center"
                weight="cm"
              >
                편지 읽으러 가기
              </Txt>
            </Link>
          </div>
        )}
      </div>
      {/* TODO: 무한스크롤 - 데이터 가져오는 중 */}
    </div>
  );
}
