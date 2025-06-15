import Txt from "./atoms/Text";

//TODO: description 통일할지 논의 후 변경
type PointItem = {
  description: string;
  date: Date;
  amount: number;
  balance: number;
};

type Props = {
  item: PointItem;
};

//TODO: 추후 TIMESTAMP 형식에 맞게 변경
function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

export default function PointItem({ item }: Props) {
  const { description, date, amount, balance } = item;
  return (
    <div className="flex flex-row justify-between py-[14px] px-7 border-b border-gray-ada ">
      <Txt size={18} weight="cm">
        {description}
      </Txt>
      <div className="flex flex-col items-end">
        <Txt size={12} weight="light" className=" text-blue-9a0">
          {formatDate(date)}
        </Txt>
        <Txt size={16} weight="bold" className=" mt-[21px] text-green-49d">
          +{amount.toLocaleString()} 원
        </Txt>
        <Txt size={13} weight="cm" className="text-blue-9a0">
          {balance.toLocaleString()} 원
        </Txt>
      </div>
    </div>
  );
}
