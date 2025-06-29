"use client";

import Image from "next/image";
import { useState } from "react";
import OnboardingCard from "@/components/OnboardingCard";
import { AddFriendModal } from "@/components/common";

export default function OnboardingPage() {
  const [isModalOpened, setModalOpened] = useState(false);
  const openModal = () => setModalOpened(true);
  const closeModal = () => setModalOpened(false);

  return (
    <div className="h-full flex flex-col gap-y-5 px-6 items-center justify-center pb-20">
      {isModalOpened && <AddFriendModal closeModal={closeModal} />}

      <Image
        src="/icons/ic-hanaolim.svg"
        alt="군장병을 위한 서비스 하나올림의 로고"
        width={122}
        height={40}
      />

      <div className="h-14" />

      <OnboardingCard mode={"soldier"} />
      <OnboardingCard mode={"viewer"} onRequestRegister={openModal} />
    </div>
  );
}
