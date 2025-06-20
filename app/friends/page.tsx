"use client";

import { ToastProvider } from "@/contexts/toast/ToastProvider";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FriendProfile } from "@/types/common/profile";
import { getFriendsList } from "@/lib/actions/friend-actions";
import FriendManageList from "@/components/FriendManageList";
import { Txt } from "@/components/atoms";
import { BasicHeader } from "@/components/common";

export default function FriendsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.userId!;

  const [friends, setFriends] = useState<FriendProfile[]>([]);

  const fetchFriends = async () => {
    const result = await getFriendsList(userId);
    setFriends(result);
  };

  useEffect(() => {
    fetchFriends();
  }, [userId]);

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-full">
        <BasicHeader title="친구 관리" />
        <div className="h-8" />
        {/* 친구 수와 친구 목록 구분선 */}
        <div className="flex flex-col bg-white-fff px-7 -mx-4 pt-4">
          <Txt size={11} weight="cm" align="left">
            총 {friends.length}명
          </Txt>
          <div className="border-b border-gray-400 px-40 h-2" />
        </div>
        {/* 친구 관리 목록 */}
        <div className="flex-1 flex flex-col bg-white-fff -mx-4 -mb-4 pb-8">
          <FriendManageList friends={friends} onRefresh={fetchFriends} />
        </div>
      </div>
    </ToastProvider>
  );
}
