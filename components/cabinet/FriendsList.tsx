"use client";

import { useState } from "react";
import FriendProfileCircle from "@/components/common/FriendProfileCircle";
import { dummyFriends } from "@/public/dummy";
import Txt from "../atoms/Text";

export default function FriendsList() {
  //TODO: 모달 컴포넌트 추가
  const [isModalOpened, setModalOpened] = useState<boolean>(false);

  const onClick = () => setModalOpened(true);

  return (
    <div className="flex w-max gap-[20px] px-[20px] overflow-x-auto">
      {/* 친구 추가 버튼 */}
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col items-center cursor-pointer whitespace-nowrap"
      >
        <div className="flex items-center border border-green-49d justify-center bg-white p-[6px] rounded-full">
          <div className="w-[37px] h-[37px] flex items-center justify-center text-green-49d">
            +
          </div>
        </div>

        <Txt className="mt-[14px] text-gray-353" weight="medium" size={12}>
          추가
        </Txt>
      </button>

      {dummyFriends.map((profile, idx) => (
        <FriendProfileCircle
          profile={profile}
          mode="list"
          key={`${idx}_${profile.code}`}
        />
      ))}
    </div>
  );
}
