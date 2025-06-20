import type { PointItemType } from "@/types/point";
import Txt from "./atoms/Text";

type Props = {
  item: PointItemType;
};

//NOTE: 날짜 형식 변경
function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

export default function PointItem({ item }: Props) {
  const { point, createDate, balance } = item;
  return (
    <div className="pt-[10px] px-7">
      <div className="flex flex-row justify-between border-b border-gray-ada">
        <Txt size={18} weight="cm">
          하나은행 편지 이벤트
        </Txt>
        <div className="flex flex-col items-end">
          <Txt size={12} weight="light" className=" text-blue-9a0">
            {formatDate(createDate)}
          </Txt>
          <Txt size={16} weight="bold" className=" mt-[21px] text-green-49d">
            +{point.toLocaleString()} 원
          </Txt>
          <Txt size={13} weight="cm" className="mb-3.5 text-blue-9a0">
            {/* prisma에서 정밀도 손실을 막기 위해 string으로 반환되는 경우 타입  */}
            {Number(balance).toLocaleString()} 원
          </Txt>
        </div>
      </div>
    </div>
  );
}
