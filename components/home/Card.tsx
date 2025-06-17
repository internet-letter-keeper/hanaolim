import Image from "next/image";
import { useRouter } from "next/navigation";
import { PrimaryButton, Txt } from "../atoms";

export default function Card() {
  const router = useRouter();

  const handleSendClick = () => {
    router.push("/hanaBank");
  };

  return (
    <div className="flex items-center justify-between w-full px-[23px] py-[19px] bg-green-5f2 border-[1px] border-green-9e7 rounded-[20px] h-[150px] overflow-hidden">
      {/* 카드 정보 */}
      <div className="flex flex-col items-start">
        <Txt size={16} weight="bold" className="text-gray-353">
          하나 나라사랑카드(체크)
        </Txt>
        <Txt size={12} weight="bold" className="text-blue-9a0">
          입출금 424-912949-15293
        </Txt>
        <Txt size={16} weight="bold" className="text-gray-900">
          123,000원
        </Txt>

        <div className="mt-3">
          <PrimaryButton
            title="보내기"
            color="green"
            rounded="sm"
            textSize={12}
            weight="medium"
            align="center"
            padding="py-0"
            className="w-[80px] h-[23px]"
            onClick={handleSendClick}
          />
        </div>
      </div>

      {/* 카드 이미지 */}
      <div className="flex-shrink-0 relative ml-[42px] w-[80px] h-[130px]">
        <Image
          src="/images/ic-hanacard.svg"
          alt="하나 나라사랑카드"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
