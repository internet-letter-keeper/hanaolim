import PointHistoryList from "@/components/PointHistoryList";
import { createDummyData } from "@/public/dummy";

// TODO: dummy data 추후 실제 데이터로 변경
const dummyData = createDummyData();

export default function PointHistoryPage() {
  return (
    <div>
      {dummyData.map((item) => (
        <PointHistoryList key={`${item.date}_${item.amount}`} item={item} />
      ))}
    </div>
  );
}
