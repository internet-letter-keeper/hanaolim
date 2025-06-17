import { dummyFriends } from "@/public/dummy";
import { Txt } from "./atoms";
import FriendProfileCircle from "./common/FriendProfileCircle";

export default function FriendManageList() {
  return (
    <div>
      {dummyFriends.map((profile) => (
        <div key={profile.id}>
          <div className="flex flex-row items-center justify-between pt-[12px] pb-[20px] px-7">
            <FriendProfileCircle isRowLayout profile={profile} />
            <button className="cursor-pointer border-[1px] border-gray-353 px-[17px] rounded-[5px] mt-[8px]">
              <Txt weight="medium">삭제</Txt>
            </button>
          </div>
          <div className="h-[1px] bg-gray-ada mx-7" />
        </div>
      ))}
    </div>
  );
}
