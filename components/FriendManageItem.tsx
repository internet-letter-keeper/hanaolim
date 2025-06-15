import { dummyFriends } from "@/public/dummy";
import { Button, Txt } from "./atoms";
import FriendProfileCircle from "./common/FriendProfileCircle";

export default function FriendManageItem() {
  return (
    <div>
      {dummyFriends.map((profile) => (
        <div
          key={profile.code}
          className="flex flex-row items-center justify-between pt-[12px] pb-[20px] px-7 border-b bg-white-fff border-gray-ada"
        >
          <FriendProfileCircle isHorizontal={true} profile={profile} />
          <Button className="border-[1px] border-gray-353 px-[17px] py-0 rounded-[5px] mt-[8px]">
            <Txt weight="medium">삭제</Txt>
          </Button>
        </div>
      ))}
    </div>
  );
}
