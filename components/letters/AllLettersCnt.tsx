import { Txt } from "../atoms";

export default function AllLettersCnt() {
  return (
    <div className="flex justify-between items-center px-4 mb-2">
      <Txt weight="cm" size={13}>
        {/* 총 {filteredLetters.length}개 */}
      </Txt>
    </div>
  );
}
