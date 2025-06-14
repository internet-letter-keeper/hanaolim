import Image from "next/image";
import Button from "@/components/atoms/Button";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Txt from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";
import TextArea from "@/components/common/TextArea";

export default function WritePage() {
  return (
    <div className="flex flex-col">
      <BasicHeader />
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-center justify-center gap-2 mt-2">
          <Image
            src="/images/ic-byeoldol-face.svg"
            alt="별돌이 얼굴"
            width={50}
            height={50}
          />
          <Image
            src="/images/ic-letter.svg"
            alt="편지"
            width={50}
            height={50}
          />
        </div>
        <div className="flex mt-[14px] mb-13 items-center justify-center">
          <Txt size={20} weight="bold" className="text-green-49d">
            별돌이&nbsp;
          </Txt>
          <Txt size={20} weight="bold" className="text-gray-939">
            군인에게 편지를 작성해주세요!
          </Txt>
        </div>
        <TextArea />
        <div className="flex flex-row justify-between w-full items-center mt-5">
          <Button className="cursor-pointer flex w-[25px] h-[25px] items-center justify-center rounded-[5px] bg-white-fff shadow drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)]">
            <Image
              src="/icons/ic-picture.svg"
              alt="사진"
              width={20}
              height={20}
            />
          </Button>
          <PrimaryButton
            title="전송"
            type="submit"
            rounded="sm"
            textSize={14}
            weight="bold"
            className="w-20"
            padding="py-1"
          />
        </div>
      </div>
    </div>
  );
}
