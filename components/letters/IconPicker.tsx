import Image from "next/image";

const icons = [
  { name: "bag", src: "/images/ic-bag.svg" },
  { name: "shoes", src: "/images/ic-shoes.svg" },
  { name: "dogtag", src: "/images/ic-byeoldol-face-blackhat.svg" },
  { name: "vest", src: "/images/ic-vest.svg" },
  { name: "face", src: "/images/ic-keyring.svg" },
  { name: "helmet", src: "/images/ic-helmet.svg" },
  { name: "gun", src: "/images/ic-gun.svg" },
];

export default function IconPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {icons.map((icon) => (
        <button
          key={icon.name}
          type="button"
          className={`
            w-12 h-12 flex items-center justify-center rounded-full p-1 cursor-pointer transition-all duration-200
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
