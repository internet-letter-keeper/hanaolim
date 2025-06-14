import PointItem from "@/components/PointItem";

// TODO: dummy data 추후 실제 데이터로 변경
function createDummyData() {
  const data = [];

  for (let i = 9; i >= 0; i--) {
    data.push({
      description: "하나은행 편지 이벤트",
      date: new Date(),
      amount: 100,
      balance: 100 * (i + 1),
    });
  }

  return data;
}

const dummyData = createDummyData();

export default function PointHistoryPage() {
  return (
    <div>
      {dummyData.map((item, idx) => (
        <PointItem
          key={idx}
          description={item.description}
          date={item.date}
          amount={item.amount}
          balance={item.balance}
        />
      ))}
    </div>
  );
}
