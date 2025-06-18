import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { IconName } from "@/types/common/icons";
import { cn } from "@/lib/utils";

type Props = {
  value: IconName;
  onChange: (name: IconName) => void;
};

export default function IconPicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-1">
      {ICONS.map(({ id, name, src }) => (
        <button
          key={id}
          type="button"
          className={cn(
            "px-1 aspect-square flex items-center justify-center rounded-full transition-all duration-200",
            {
              "bg-white-fff shadow-[0_0_10px_0_rgba(32,155,152,0.35)]":
                value === name,
            }
          )}
          onClick={() => onChange(name)}
        >
          <Image
            src={src}
            alt={name}
            width={33}
            height={33}
            className="object-contain w-[33px] h-[33px]"
          />
        </button>
      ))}
    </div>
  );
}
