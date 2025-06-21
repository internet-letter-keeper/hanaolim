"use client";

import Image from "next/image";
import { useToast } from "@/contexts/toast/ToastContext";

export default function CopyCodeBtn() {
  const { showToast } = useToast();

  const onShareBtnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("URL이 복사되었어요. 친구에게 공유해보세요!");
  };

  return (
    <button onClick={onShareBtnClick}>
      <Image
        src="/icons/ic-share.svg"
        alt="캐비넷 링크 공유 아이콘"
        width={18}
        height={18}
      />
    </button>
  );
}
