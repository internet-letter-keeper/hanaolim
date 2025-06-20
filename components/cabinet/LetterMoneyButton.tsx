"use client";

import { useToast } from "@/contexts/toast/ToastContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getAccountNumBySoldierId } from "@/lib/actions/friend-actions";
import { Txt } from "../atoms";

type SoldierSupportProps = {
  type: "coin" | "letter";
  onClick: () => void;
};

function SoldierSupportButton({ type, onClick }: SoldierSupportProps) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-[6px]">
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

type Props = {
  soldierId: number;
};

export default function LetterMoneyButton({ soldierId }: Props) {
  const router = useRouter();

  const { data } = useSession();

  const { showToast } = useToast();

  const onCoinClick = async () => {
    // 소셜로그인이면 soldierId 해당 군인의 계좌번호 복사, 이메일 로그인이면 하나원큐로 이동
    if (data?.user.isSocial) {
      const accountNum = await getAccountNumBySoldierId(soldierId);
      navigator.clipboard.writeText(accountNum);
      showToast("계좌번호가 복사되었습니다");
    } else {
      router.push("/hanaBank");
    }
  };

  // FIXME: 편지 작성 페이지 route 이름 확정되면 수정
  const onLetterClick = () => router.push(`/write/${soldierId}`);

  return (
    <div className="flex items-center justify-end gap-2">
      <SoldierSupportButton type="coin" onClick={onCoinClick} />
      <SoldierSupportButton type="letter" onClick={onLetterClick} />
    </div>
  );
}
