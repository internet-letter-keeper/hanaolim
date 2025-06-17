import Image from "next/image";
import { Toast } from "@/components/common";
import { Card, Olim, Profile, Savings } from "@/components/home";

export default function Page() {
  return (
    <>
      <div className="flex flex-col relative gap-[15px]">
        <Toast />
        <Image
          src="/images/ic-hanaolim-logo.svg"
          alt="편지 아이콘"
          width={110}
          height={36}
        />
        <Profile endDate={new Date()} />
        <Olim />
        <Card />
        <Savings savingBalance={0} />
      </div>
    </>
  );
}
