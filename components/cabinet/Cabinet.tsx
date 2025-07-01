"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Txt } from "@/components/atoms";
import { ICON_POSITION } from "@/constants/icons";
import { useToast } from "@/contexts/toast/ToastContext";
import { getLettersByUserId } from "@/lib/actions/letter-actions";
import { isNotSoldierYet } from "@/utils/date";
import { getIconInfoByIconId } from "@/utils/icon";
import { NewIcon } from "../common";
import LetterModal from "../letters/LetterModal";

type Props = {
  soldierId: number;
  letters: Awaited<ReturnType<typeof getLettersByUserId>>["data"];
};

export default function Cabinet({ soldierId, letters }: Props) {
  const { data } = useSession();
  const loginSoldier = data?.user.soldier;
  const startDate = loginSoldier ? data?.user.soldier.startDate : null;

  const isMyCabinet = loginSoldier
    ? loginSoldier.soldierId === soldierId
    : false;

  const { showToast } = useToast();

  const [openedLetterId, setOpenedLetterId] = useState<number | null>(null);

  const [optimisticallyReadIds, setOptimisticallyReadIds] = useState<number[]>(
    []
  );

  const onLetterClick = async (letterId: number) => {
    if (!isMyCabinet) {
      showToast("받은 사람만 볼 수 있어요", "", "warning");
      return;
    }

    if (!startDate) return null;

    if (isMyCabinet && isNotSoldierYet(startDate)) {
      showToast("입대일 이후에 열어볼 수 있어요", "", "warning");
      return;
    }

    setOpenedLetterId(letterId);

    // 읽자마자 'New' 아이콘 숨김 처리
    setOptimisticallyReadIds((prev) => [...prev, letterId]);
  };

  return (
    <div className="relative size-full">
      {openedLetterId && (
        <LetterModal
          letterId={openedLetterId}
          onHandleModal={() => setOpenedLetterId(null)}
        />
      )}

      <Image
        src="/images/cabinet.svg"
        alt="관물대 이미지"
        width={1000}
        height={1000}
        priority
      />

      {letters?.map(({ letterId, iconId, readDate, nickname }, idx) => {
        if (!iconId) return null;

        const { src, alt } = getIconInfoByIconId(iconId);

        const isRead = !!readDate || optimisticallyReadIds.includes(letterId);

        return (
          <button
            key={letterId}
            onClick={() => onLetterClick(letterId)}
            className={"absolute w-[22%] h-[14%] " + ICON_POSITION[idx]}
          >
            {!isRead && (
              <NewIcon className="absolute top-0 right-0.5 size-[30%]" />
            )}
            <Image src={src} alt={alt} fill />
            <Txt
              weight="medium"
              className="absolute bottom-0 left-2 text-white truncate max-w-[7ch] z-10"
            >
              {nickname}
            </Txt>
          </button>
        );
      })}
    </div>
  );
}
