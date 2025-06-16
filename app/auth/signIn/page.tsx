import Image from "next/image";
import { PrimaryButton, Input, Txt } from "@/components/atoms";
import icGoogle from "@/public/icons/ic-google.svg";
import icKakao from "@/public/icons/ic-kakao.svg";
import icNaver from "@/public/icons/ic-naver.svg";
import hanaOlim from "@/public/images/ic-hanaolim-logo.svg";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* 하나 올림 로고 */}
      <div className="relative w-[184px] h-[49px]">
        <Image
          src={hanaOlim}
          alt="Hana Olim"
          className="w-full h-full object-cover"
        />
      </div>
      {/* 통합 로그인 텍스트 */}
      <Txt
        weight="cm"
        align="center"
        className="text-[#AAAAAA] not-italic font-normal leading-none mt-1"
      >
        통합 로그인
      </Txt>
      {/* 아이디, 비밀번호 입력 필드 + 로그인 버튼 + 또는 */}
      <div className="mt-[44px] w-[249px]">
        {/* 아이디 */}
        <div className="flex justify-between">
          <Txt
            size={19}
            weight="cm"
            className="text-[#393939] not-italic font-normal leading-none mt-[7px]"
          >
            아이디
          </Txt>
          <Input
            placeholder=""
            inputType="auth"
            className="flex w-[170px] items-center"
          />
        </div>
        {/* 비밀번호 */}
        <div className="flex mt-4 justify-between">
          <Txt
            size={19}
            weight="cm"
            className="text-[#393939] not-italic font-normal leading-none mt-[7px]"
          >
            비밀번호
          </Txt>
          <Input
            placeholder=""
            inputType="auth"
            className="flex w-[170px] items-center"
          />
        </div>
        {/* 로그인 버튼 */}
        <PrimaryButton
          title="로그인"
          rounded="sm"
          textSize={16}
          align="center"
          weight="cm"
          className="mt-[22px] h-[38px] font-normal"
        ></PrimaryButton>
        {/* 또는 */}
        <div className="flex items-center justify-center mt-[16px] w-full h-[21px]">
          <svg className="mr-2" width="102" height="1">
            <line
              x1="0"
              y1="0.5"
              x2="102"
              y2="0.5"
              stroke="var(--color-gray-fdf)"
              strokeWidth="1"
            />
          </svg>
          <Txt
            size={13}
            weight="cm"
            className="text-[#AAAAAA] not-italic font-normal leading-[21px] text-center"
          >
            또는
          </Txt>
          <svg className="ml-2" width="102" height="1">
            <line
              x1="0"
              y1="0.5"
              x2="102"
              y2="0.5"
              stroke="var(--color-gray-fdf)"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
      {/* 소셜 로그인 */}
      <div className="flex mt-[17px] w-[138px]">
        <button>
          <Image className="w-[38px] h-[38px]" alt="naverImage" src={icNaver} />
        </button>
        <button className="ml-[12px]">
          <Image
            className="w-[37.909px] h-[38px] flex-shrink-0 aspect-[37.91/38] rounded-[100px]"
            alt="kakaoImage"
            src={icKakao}
          />
        </button>
        <button className="ml-[12px]">
          <div className="w-[36.828px] h-[38px] flex-shrink-0 bg-white rounded-[18.41px/19px]">
            <Image
              className="relative w-[26.192px] h-[26.192px] flex-shrink-0 aspect-[26.19/26.19] top-1.5 left-[5px]"
              alt="googleImage"
              src={icGoogle}
            />
          </div>
        </button>
      </div>
      {/* 회원가입 안내 */}
      <div
        className="flex items-center
       mt-[45px]"
      >
        <Txt
          size={12}
          className="not-italic font-normal leading-none text-[#535353]"
        >
          가입한 계정이 없으신가요?
        </Txt>
        <button className="ml-[14px] mb-1">
          <Txt
            size={12}
            className="not-italic font-normal leading-none text-[#535353] underline underline-offset-auto"
          >
            회원가입
          </Txt>
        </button>
      </div>
      {/* 최상단 div 끝 */}
    </div>
  );
}

// taildwind 설명
// font-style: normal;	not-italic
// font-weight: 400;	font-normal
// line-height: 21px;	leading-[21px] // line-height가 normal이면 leading-none
