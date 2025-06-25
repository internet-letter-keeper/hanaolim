"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { startTransition, useState } from "react";
import { useToast } from "@/contexts/toast/ToastContext";
import { getFirstFollow } from "@/lib/actions/friend-actions";
import { deleteFriend } from "@/lib/actions/friends-action";
import { FriendProfile } from "@/types/common/profile";
import EmptyState from "./EmptyList";
import { Txt } from "./atoms";
import { Modal } from "./common";
import FriendProfileCircle from "./common/FriendProfileCircle";

type Props = {
  friends: FriendProfile[];
};

export default function FriendManageList({ friends }: Props) {
  const { data: session, update } = useSession();
  const userId = session?.user.userId;

  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedFollowId, setSelectedFollowId] = useState<number | null>(null);

  const router = useRouter();

  const { showToast } = useToast();

  const openModal = (followId: number) => {
    setSelectedFollowId(followId);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedFollowId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedFollowId === null || userId === undefined) return;
    startTransition(async () => {
      const deleteResult = await deleteFriend(selectedFollowId);
      const basePosition =
        "top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2";

      const toastMessage = deleteResult.success
        ? "성공적으로 삭제되었습니다"
        : "삭제 도중 문제가 생겼습니다 다시 시도해 주세요";

      const toastType = deleteResult.success ? "success" : "error";

      showToast(toastMessage, basePosition, toastType);
      const follow = await getFirstFollow(userId);
      await update({ ...session?.user, follow: follow });
      // 세션 업데이트 필요
      closeModal();
      router.refresh();
    });
  };

  return (
    <div>
      {isModalOpened && (
        <Modal
          greenBtnText="삭제"
          whiteBtnText="취소"
          onClickGreenBtn={handleConfirmDelete}
          onClickWhiteBtn={closeModal}
        >
          친구 목록에서 삭제하시겠습니까?
        </Modal>
      )}
      {/* 친구 목록  */}
      {friends.length > 0 ? (
        friends.map((item) => (
          <div key={item.followId}>
            <div className="flex flex-row items-center justify-between pt-[12px] pb-[20px] px-7">
              <FriendProfileCircle isRowLayout profile={item} />
              <button
                className="border-[1px] border-gray-353 px-[17px] rounded-[5px] mt-[8px]"
                onClick={() => openModal(item.followId)}
              >
                <Txt weight="medium">삭제</Txt>
              </button>
            </div>
            <div className="h-[1px] bg-gray-ada mx-7" />
          </div>
        ))
      ) : (
        <EmptyState>
          친구 목록이 비어있어요 <br /> 친구를 추가하고 편지를 주고받아요!
        </EmptyState>
      )}
    </div>
  );
}
