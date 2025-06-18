import { useToast } from "@/contexts/toast/ToastContext";
import { dDayConCatString } from "@/utils/date";
import Image from "next/image";
import { Txt } from "../atoms";

type Props = {
  userName: string;
  endDate?: Date;
  code?: string;
  level?: 1 | 2 | 3 | 4;
};
/**
 * userName: 군인 이름
 * endDate: 전역일
 * code: 관물대 코드
 * level: 군인 계급
 */
export default function Profile({
  userName = "별돌이",
  endDate,
  code = "ㅇㅇㅇ",
  level = 1,
}: Props) {
  const { showToast } = useToast();
  if (!endDate) return;
  const dDay = dDayConCatString(endDate);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    showToast("코드가 복사되었습니다!");
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex border border-green-49d rounded-full p-[6px] items-center justify-center">
        <Image
          src={`${code ? `/images/profilepic-${level}.svg` : "/Image/white-byeoldol.svg"}`}
          alt="profile-icon"
          width={55}
          height={55}
        />
      </div>
      <div>
        {code ? (
          <div className="flex flex-col">
            <div className="flex w-fit items-center justify-center bg-green-49d rounded-[4px] px-2 py-[1px]">
              <Txt size={13} className="text-white-fff" weight="medium">
                {dDay}
              </Txt>
            </div>
            <div className="flex flex-row">
              <Txt size={20} className="text-green-49d" weight="medium">
                {userName}
              </Txt>
              <Txt size={20} weight="medium">
                님의 관물대
              </Txt>
            </div>
            <button
              className="flex flex-row gap-2 align-bottom"
              onClick={handleCopyCode}
            >
              <Txt size={13} weight="medium" className="underline">
                {code}
              </Txt>
              <Image
                src="/icons/ic-copy.svg"
                alt="copy-icon"
                width={12}
                height={12}
              />
            </button>
          </div>
        ) : (
          <>
            <Txt size={20} className="text-gray-353" weight="medium">
              안녕하세요&nbsp;
            </Txt>
            <Txt size={20} className="text-green-49d" weight="medium">
              {userName}
            </Txt>
            <Txt size={20} className="text-gray-353" weight="medium">
              님
            </Txt>
          </>
        )}
      </div>
    </div>
  );
}
