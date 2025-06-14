"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import Txt from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";
import IconPicker from "@/components/letters/IconPicker";

export default function WritePage() {
  const [isImage, setIsImage] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("face");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsImage(true);
    }
  };

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
        <div className="flex flex-col gap-[14px] mb-8">
          <Txt size={16} className="text-gray-939" weight="cm" align="left">
            관물대에 넣을 물건 선택해주세요.
          </Txt>
          <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
        </div>
        <form className="flex flex-col gap-3 w-full">
          <Input
            placeholder="닉네임"
            inputType="auth"
            className="w-1/3 text-gray-939 placeholder:text-blue-9a0 text-[15px] pl-[18px]"
          />
          <Input
            placeholder="내용을 입력하세요."
            inputType="auth"
            tag="textarea"
            className="flex w-full h-[230px] text-[15px] rounded-[10px] py-[10px] px-[18px] bg-white-fff text-gray-939 placeholder:text-blue-9a0 focus:outline-none"
          />
        </form>
        <div className="flex flex-row justify-between w-full items-center mt-5">
          <Button
            onClick={onClickImage}
            className="cursor-pointer flex w-[25px] h-[25px] items-center justify-center rounded-[5px] bg-white-fff shadow drop-shadow-[0px_0px_5px_rgba(0,0,0,0.15)]"
          >
            <Image
              src="/icons/ic-picture.svg"
              alt="사진"
              width={20}
              height={20}
            />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />
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
