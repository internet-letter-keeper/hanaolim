"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Txt } from "@/components/atoms";
import { useToast } from "@/contexts/toast/ToastContext";
import { postFriendbyId } from "@/lib/actions/friend-actions";
import {
  getNonReplyLettersByUserId,
  getTotalReceivedNonReplyLettersCnt,
} from "@/lib/actions/letter-actions";
import { getIconInfoByIconId, getIconPositionByIdx } from "@/utils/icon";
import { NewIcon } from "../common";
import LetterModal from "../letters/LetterModal";

type Props = {
  isMyCabinet: boolean;
  userId: number;
  loginId: number;
};

export default function Cabinet({ isMyCabinet, userId, loginId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);

  const [totalLettersCnt, setTotalLettersCnt] = useState(0);

  const { showToast } = useToast();

  const toPrevCabinet = () => setCurrentPage((prev) => prev - 1);

  const toNextCabinet = () => setCurrentPage((prev) => prev + 1);

  const [currentPageLetters, setCurrentPageLetters] =
    useState<Awaited<ReturnType<typeof getNonReplyLettersByUserId>>["data"]>();

  const [isModalOpened, setModalOpened] = useState(false);

  const [isOpenedLetterId, setOpenedLetterId] = useState(0);

  const searchParams = useSearchParams();
  const addFollow = searchParams.get("add");

  useEffect(() => {
    (async () => {
      const totalLettersCntInit =
        await getTotalReceivedNonReplyLettersCnt(userId);

      setTotalLettersCnt(totalLettersCntInit);

      setTotalPage(
        totalLettersCntInit <= 7 ? 1 : Math.ceil(totalLettersCntInit / 7)
      );

      const letters = await getNonReplyLettersByUserId(
        userId,
        1,
        totalLettersCntInit
      );

      setCurrentPageLetters(letters.data);
      // TODO: 데이터 없을 때 예외처리
      // else
      if (addFollow === "true") await postFriendbyId(userId, loginId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const letters = await getNonReplyLettersByUserId(
        userId,
        currentPage,
        totalLettersCnt
      );

      if (letters.data) {
        setCurrentPageLetters(letters.data);
      }
      // TODO: 데이터 없을 때 예외처리
      // else
    })();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center relative px-10">
      {isModalOpened && (
        <LetterModal
          letterId={isOpenedLetterId}
          onHandleModal={() => setModalOpened(false)}
        />
      )}

      {/* 관물대 첫 페이지면 이전 페이지 버튼이 안 보이게 */}
      {currentPage > 1 ? (
        <button onClick={toPrevCabinet}>
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 이전 페이지로"
            width={20}
            height={20}
            className="absolute w-[5%] scale-x-[-1] left-0 top-[45%]"
          />
        </button>
      ) : (
        <div />
      )}

      <Image
        src="/images/cabinet.svg"
        alt="관물대 이미지"
        layout="responsive"
        width={10}
        height={10}
      />

      {currentPageLetters?.map(
        ({ letterId, iconId, readDate, nickname }, idx) => {
          if (!iconId) return null;

          const iconPosition = getIconPositionByIdx(idx);

          const { src, alt } = getIconInfoByIconId(iconId);

          return (
            <button
              key={letterId}
              onClick={() => {
                if (!isMyCabinet) {
                  showToast("내가 작성한 편지가 아니에요", "", "error");
                  return;
                }

                setOpenedLetterId(letterId);
                setModalOpened(true);
              }}
              className={iconPosition}
            >
              {!readDate && (
                <NewIcon className="absolute top-0 right-0.5 w-[25%] h-[30%]" />
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
        }
      )}

      {/* 관물대 마지막 페이지면 다음 페이지 버튼이 안 보이게 */}
      {currentPage < totalPage && (
        <button onClick={toNextCabinet}>
          <Image
            src="/icons/ic-next-page.svg"
            alt="관물대 다음 페이지로"
            width={20}
            height={20}
            className="absolute w-[5%] right-0 top-[45%]"
          />
        </button>
      )}

      {/* 페이지네이션 */}
      <div className="flex items-center mt-2 bg-white-2f2 rounded-[5px] px-3 py-0.5">
        <Txt className="text-blue-9a0" weight="medium" size={12}>
          {currentPage}/{totalPage}
        </Txt>
      </div>
    </div>
  );
}
