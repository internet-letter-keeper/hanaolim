"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { startTransition, useState } from "react";
import { useToast } from "@/contexts/toast/ToastContext";
import { getFirstFollow, deleteFriend } from "@/lib/actions/friend-actions";
import { FriendProfile } from "@/types/common/profile";
import EmptyState from "./EmptyList";
import { PrimaryButton, Txt } from "./atoms";
import { AddFriendModal, FriendProfileCircle, Modal } from "./common";

type Props = {
  friends: FriendProfile[];
};

export default function FriendManageList({ friends }: Props) {
  const { data: session, update } = useSession();
  const userId = session?.user.userId;

  const [isAddFriendModalOpened, setAddFriendModalOpened] =
    useState<boolean>(false);

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
      const { success, message } = await deleteFriend(selectedFollowId);
      const basePosition =
        "top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2";

      const toastType = success ? "success" : "error";

      showToast(message, basePosition, toastType);
      const follow = await getFirstFollow(userId);
      await update({ ...session?.user, follow: follow });
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
            <div className="flex flex-row items-center justify-between pt-3 pb-5 pl-7 pr-10">
              <FriendProfileCircle isRowLayout profile={item} />
              <button
                className="flex border-[1px] border-gray-353 px-2 py-1 rounded-[5px] mt-[8px]"
                onClick={() => openModal(item.followId)}
              >
                <Txt weight="medium" className="leading-none">
                  삭제
                </Txt>
              </button>
            </div>
            <div className="h-[1px] bg-gray-ada mx-7" />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center gap-6">
          {isAddFriendModalOpened && (
            <AddFriendModal closeModal={() => setAddFriendModalOpened(false)} />
          )}
          <EmptyState>
            친구 목록이 비어있어요 <br /> 친구를 추가하고 편지를 주고받아요!
          </EmptyState>
          <PrimaryButton
            title="친구 추가하기"
            className="py-2 px-5 w-fit font-bold"
            onClick={() => setAddFriendModalOpened(true)}
          />
        </div>
      )}
    </div>
  );
}
