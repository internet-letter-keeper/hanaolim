"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ONBOARDING_MODE } from "@/constants/onboardingMode";
import { cn } from "@/lib/utils";
import { Txt } from "./atoms";
import { AddFriendModal } from "./common";

type Props = {
  mode: "soldier" | "viewer";
};

export default function OnboardingOption({ mode }: Props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  const router = useRouter();

  const selectedMode =
    ONBOARDING_MODE[mode === "soldier" ? "soldier" : "viewer"];
  const { title, label, imgSrc, iconAlt, imgAlt } = selectedMode;

  //soldier 모드면 군인 등록으로, viewer 모드면 친구 추가 모달 띄우기
  const handleOnclick = () => {
    if (mode === "soldier") router.push("/registerSoldier");
    else openModal();
  };

  return (
    <>
      {isModalOpened && <AddFriendModal closeModal={closeModal} />}

      <button
        onClick={handleOnclick}
        className={cn(
          "h-[130px] rounded-[20px] p-[18px] border bg-green-5f2 border-green-9e7",
          { "bg-blue-0f5 border-blue-af0": mode === "viewer" }
        )}
      >
        <div className="flex gap-[10px]">
          <div className="flex flex-col gap-[11px]">
            <Txt size={18} align="left" weight="bold">
              {title}
            </Txt>
            <div className="flex flex-row gap-2">
              <Txt size={12} weight="cm" className="text-gray-353">
                {label}
              </Txt>
              <Image
                src={"/icons/ic-chevron-right.svg"}
                alt={iconAlt}
                width={5}
                height={10}
              />
            </div>
          </div>
          <Image src={imgSrc} alt={imgAlt} width={70} height={70} />
        </div>
      </button>
    </>
  );
}
