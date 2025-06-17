import Image from "next/image";

export default function HanaBankPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        src="/icons/ic-hanaBank.svg"
        alt="하나은행 로고"
        width={190}
        height={190}
      />
    </div>
  );
}
