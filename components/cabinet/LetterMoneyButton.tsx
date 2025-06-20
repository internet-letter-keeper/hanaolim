"use client";

import { useToast } from "@/contexts/toast/ToastContext";
import Image from "next/image";
import { Txt } from "../atoms";

type SoldierSupportProps = {
  type: "coin" | "letter";
  onClick: () => void;
};

function SoldierSupportButton({ type, onClick }: SoldierSupportProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-[6px]"
    >
      <div className="flex items-center w-[50px] h-[50px] justify-center bg-white border rounded-full border-blue-9a0">
        <Image
          src={`/images/${type}.svg`}
          alt={type === "coin" ? "동전 아이콘" : "편지 아이콘"}
          width={34}
          height={34}
        />
      </div>
      <Txt className="text-blue-9a0" weight="medium" size={12}>
        {type === "coin" ? "용돈 보내기" : "편지 쓰기"}
      </Txt>
    </button>
  );
}

export default function LetterMoneyButton() {
  const { showToast } = useToast();

  const onCoinClick = () => {
    showToast("계좌번호가 복사되었습니다!");
  };

  const onLetterClick = () => alert("편지 쓰기 버튼 클릭");

  return (
    <div className="flex items-center justify-end gap-2">
      <SoldierSupportButton type="coin" onClick={onCoinClick} />
      <SoldierSupportButton type="letter" onClick={onLetterClick} />
    </div>
  );
}
