import PointItem from "@/components/PointItem";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";
import { createDummyData } from "@/public/dummy";

// TODO: dummy data 추후 실제 데이터로 변경
const dummyData = createDummyData();

export default function PointHistoryPage() {
  return (
    <div className="flex flex-col">
      <BasicHeader title="포인트 내역 조회" />
      <Txt size={25} weight="bold" align="center" className="my-14">
        {/* 포인트 잔액 */}
        {dummyData[0].balance.toLocaleString()} 원
      </Txt>
      <div className="flex flex-col bg-white-fff h-screen -mx-4">
        <div>
          {/* 잔액/내역 구분선 */}
          <div className="h-[1px] bg-gray-530 mb-4 mt-7 mx-7" />
        </div>
        {/* 포인트 입금 내역 */}
        {dummyData.map((item) => (
          <PointItem key={`${item.date}_${item.amount}`} item={item} />
        ))}
      </div>
    </div>
  );
}
