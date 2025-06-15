import Image from "next/image";
import { ICONS, IconName } from "@/types/common/icons";
import { cn } from "@/lib/utils";

export default function IconPicker({
  value,
  onChange,
}: {
  value: IconName;
  onChange: (name: IconName) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {ICONS.map(({ id, name, src }) => (
        <button
          key={id}
          type="button"
          className={cn(
            "w-12 aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all duration-200",
            value === name
              ? "bg-white-fff shadow-[0_0_10px_0_rgba(32,155,152,0.35)]"
              : ""
          )}
          onClick={() => onChange(name)}
        >
          <Image
            src={src}
            alt={name}
            width={33}
            height={33}
            className="object-contain"
          />
        </button>
      ))}
    </div>
  );
}
