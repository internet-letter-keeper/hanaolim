import Image from "next/image";

const icons = [
  { id: 1, name: "bag", src: "/images/ic-bag.svg" },
  { id: 2, name: "shoes", src: "/images/ic-shoes.svg" },
  { id: 3, name: "dogtag", src: "/images/ic-byeoldol-face-blackhat.svg" },
  { id: 4, name: "vest", src: "/images/ic-vest.svg" },
  { id: 5, name: "face", src: "/images/ic-keyring.svg" },
  { id: 6, name: "helmet", src: "/images/ic-helmet.svg" },
  { id: 7, name: "gun", src: "/images/ic-gun.svg" },
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
