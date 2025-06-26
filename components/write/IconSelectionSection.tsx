import { Txt } from "@/components/atoms";
import { IconPicker } from "@/components/letters";
import { IconName } from "@/types/common/icons";

type Props = {
  selectedIcon: IconName;
  onChange: (icon: IconName) => void;
};

export default function IconSelectionSection({
  selectedIcon,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-[14px] mb-8">
      <Txt size={16} weight="cm" align="left">
        관물대에 넣을 물건을 선택해주세요.
      </Txt>
      <IconPicker value={selectedIcon} onChange={onChange} />
    </div>
  );
}
