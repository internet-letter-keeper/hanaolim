"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/contexts/toast/ToastContext";
import { getAccountNumBySoldierId } from "@/lib/actions/friend-actions";
import { cn } from "@/lib/utils";
import { Txt } from "../atoms";
import { Modal } from "../common";

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
  soldierName: string;
};

export default function LetterMoneyButton({ soldierId, soldierName }: Props) {
  const router = useRouter();

  const { data } = useSession();

  const isLogggedIn = !!data?.user.userId;

  const { showToast } = useToast();

  const [isOpen, setIsOpen] = useState(false);

  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const closeModal = () => setModalOpened(false);

  const onCoinClick = async () => {
    // 미로그인, 소셜로그인이면 군인의 계좌번호 복사
    // 이메일 로그인이면 하나원큐로 이동
    if (!data?.user || data?.user.isSocial) {
      const { success, message, accountNum } =
        await getAccountNumBySoldierId(soldierId);

      if (success) {
        navigator.clipboard.writeText(accountNum!);
        showToast("계좌번호가 복사되었습니다");
      }

      if (!success) {
        showToast(message!, "", "error");
      }
      return;
    }

    router.push("/hanaBank");
  };

  const onLetterClick = () => {
    if (isLogggedIn) router.push(`/write/${soldierId}?name=${soldierName}`);
    else setModalOpened(true);
  };

  const navigateToSignIn = () =>
    router.push(`/write/${soldierId}?name=${soldierName}`);

  return (
    <div className="absolute bottom-6 right-2 z-50 flex flex-col items-center gap-3">
      {isModalOpened && !isLogggedIn && (
        <Modal
          greenBtnText="로그인"
          whiteBtnText="닫기"
          onClickGreenBtn={navigateToSignIn}
          onClickWhiteBtn={closeModal}
        >
          로그인 후 이용해주세요
        </Modal>
      )}

      {/* 열렸을 때 나오는 용돈/편지 버튼들 */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <SoldierSupportButton type="coin" onClick={onCoinClick} />
      </div>
      <div
        className={`transition-all duration-300 delay-75 ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <SoldierSupportButton type="letter" onClick={onLetterClick} />
      </div>

      {/* 메인 플로팅 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#FFE9EF] rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <Plus
          className={cn("w-6 h-6 transition-transform", {
            "rotate-45": isOpen,
          })}
        />
      </button>
    </div>
  );
}
