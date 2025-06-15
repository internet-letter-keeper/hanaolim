import Image from "next/image";
import { ICONS, IconName } from "@/types/common/icons";

export default function IconPicker({
  value,
  onChange,
}: {
  value: IconName;
  onChange: (name: IconName) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {ICONS.map((icon) => (
        <button
          key={icon.id}
          type="button"
          className={`
            w-12 aspect-square flex items-center justify-center rounded-full cursor-pointer transition-all duration-200
            ${value === icon.name ? "bg-white-fff shadow-[0_0_10px_0_rgba(32,155,152,0.35)]" : ""}
          `}
          onClick={() => onChange(icon.name)}
        >
          <Image
            src={icon.src}
            alt={icon.name}
            width={33}
            height={33}
            className="object-contain"
          />
        </button>
      ))}
    </div>
  );
}
