import Txt from "@/components/atoms/Text";

export default function PointRuleTooltip() {
  return (
    <div className="relative flex flex-col items-end">
      <div className="absolute -top-3 right-11.5">
        {/* 말풍선 꼬리 */}
        <div className="w-0 h-0 border-x-10 border-x-transparent border-b-[15px] border-b-green-49d z-20"></div>
        <div className="absolute w-0 h-0 border-x-10 border-x-transparent border-b-[15px] border-b-white -mt-3.5 z-50"></div>
      </div>
      {/* 말풍선 본체 */}
      <div className="w-max h-[35px] bg-white border-[0.5px] border-green-49d rounded-[10px] px-4 flex items-center z-30 shadow">
        <Txt size={12} weight="cm" className="text-green-49d">
          동일 회원의 편지는 하루에 최대 1개만 반영됩니다.
        </Txt>
      </div>
    </div>
  );
}
