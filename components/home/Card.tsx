import Image from "next/image";
import Link from "next/link";
import { getAccountInfo } from "@/lib/actions/home-actions";
import { requireAuth } from "@/utils/auth";
import { PrimaryButton, Txt } from "../atoms";

export default async function Card() {
  const session = await requireAuth();
  const userId = session.user.userId;
  const { accountNum, accountBalance } = await getAccountInfo(userId);

  return (
    <Link
      href="/hanaBank"
      className="flex items-center justify-between w-full px-[23px] py-[19px] bg-green-5f2 border-[1px] border-green-9e7 rounded-[20px] h-[150px] overflow-hidden cursor-pointer"
    >
      {/* 카드 정보 */}
      <div className="flex flex-col items-start">
        <Txt size={16} weight="bold" className="text-gray-353">
          하나 나라사랑카드(체크)
        </Txt>
        <Txt size={12} weight="bold" className="text-blue-9a0">
          입출금 {accountNum}
        </Txt>
        <Txt size={16} weight="bold" className="text-gray-900">
          {accountBalance.toLocaleString()}원
        </Txt>

        <div className="mt-3">
          <PrimaryButton title="보내기" className="w-[80px] h-[23px]" />
        </div>
      </div>

      {/* 카드 이미지 */}
      <div className="flex-shrink-0 relative ml-[42px] w-[80px] h-[130px]">
        <Image
          src="/images/hanacard.svg"
          alt="하나 나라사랑카드"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
