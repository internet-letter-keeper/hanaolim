import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  Ref,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import { cn } from "@/lib/utils";

// auth: 로그인, 회원가입용, 글쓰기 input
// modal: 모달창용 input
// search: 편지보관함 검색창용 input
const borderObject = {
  auth: "border rounded-[10px] border-transparent outline-none shadow-[0_0_5px_rgba(0,0,0,0.15)]",
  modal: "border border-solid border-[#1EA698] rounded-[5px]",
  search: "border border-[#F2F2F2] rounded-[10px]",
};

// input 컴포넌트의 기본 스타일
const baseStyle = `
  w-full h-[39px] bg-white px-3 text-gray-939
  font-[Hana2-CM] text-[14px] leading-[18px] font-normal 
  resize-none placeholder:text-[#AAAAAA] 
  focus:outline-none focus:ring-0
`;

// textarea 컴포넌트의 기본 스타일
const textAreaStyle =
  "flex h-[230px] text-[15px] py-[10px] px-[18px] placeholder:text-blue-9a0";

type Props = {
  placeholder: string;
  usage?: "auth" | "modal" | "search";
  tag?: "input" | "textarea";
  className?: string;
  customRef?: Ref<HTMLInputElement> | Ref<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">;
/**
 * @param placeholder - placeholder 안내 문구
 * @param usage - 사용처 ('auth' 또는 'modal' 또는 'search')
 * @param tag - 사용할 태그 ('input' 또는 'textarea')
 * @param className - 추가 스타일 클래스
 * @param customRef - ref 속성
 * @param props - 입력 컴포넌트 속성
 */
export default function Input({
  placeholder,
  usage = "auth",
  tag = "input",
  customRef,
  className,
  ...props
}: Props) {
  if (tag === "textarea") {
    return (
      <textarea
        ref={customRef as Ref<HTMLTextAreaElement>}
        placeholder={placeholder}
        className={cn(baseStyle, borderObject["auth"], textAreaStyle)}
        {...props}
      />
    );
  }

  return (
    <input
      ref={customRef as Ref<HTMLInputElement>}
      placeholder={placeholder}
      className={cn(baseStyle, borderObject[usage], className)}
      {...props}
    />
  );
}
