import { dummyFriends } from "@/public/dummy";
import { AddFriendBtn } from ".";
import { FriendProfileCircle } from "../common";

export default function FriendsList() {
  return (
    <div className="overflow-x-auto -mx-4 px-4 [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-[20px]">
        <AddFriendBtn />
        {dummyFriends.map((profile) => (
          <FriendProfileCircle profile={profile} key={profile.code} />
        ))}
      </div>
    </div>
  );
}
