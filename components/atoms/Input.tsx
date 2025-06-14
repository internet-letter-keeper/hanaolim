import { HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = {
  placeholder: string;
  inputType: "auth" | "modal" | "search"; // 입력 타입 (기본: 'auth',
  // 사용할 태그 (기본: 'input', textarea 등 지정 가능)
  tag?: "input" | "textarea";
  name?: string;
  // input 타입 (예: 'text', 'email' 등)
  type?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  required?: boolean;
  defaultValue?: string;
  // textarea용 줄 수 설정
  rows?: number;
  disabled?: boolean;
  // 자동 포커스 여부
  autoFocus?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  HTMLAttributes<HTMLTextAreaElement>;


// auth: 로그인, 회원가입용, 글쓰기 input
// modal: 모달창용 input
// search: 편지보관함 검색창용 input
const borderObject = {
  auth: "border border-transparent outline-none rounded-[10px] shadow-[0_0_5px_rgba(0,0,0,0.15)]",
  modal: "border border-solid border-[#1EA698] rounded-[5px]",
  search: "border border-[#F2F2F2] rounded-[10px]",
};

// input 컴포넌트의 기본 스타일
const baseStyle = `
  w-full h-[39px]
  bg-white
  px-3
  font-[Hana2-CM] text-[14px] leading-[18px] font-normal 
  resize-none placeholder:text-[#AAAAAA]
  focus:outline-none focus:ring-0
`;

/**
 * @param props - 입력 컴포넌트 속성
 * @param inputType - 입력 타입 ('auth' 또는 'modal' 또는 'search')
 * @param tag - 사용할 태그 ('input' 또는 'textarea')
 * @param name - name 속성
 * @param type - input 타입 (예: 'text', 'email' 등)
 * @param value - 입력값
 * @param onChange - 입력 이벤트 핸들러
 * @param placeholder - placeholder 안내 문구
 * @param className - 추가 스타일 클래스
 * @param required - 필수 입력 여부
 * @param rows - textarea 줄 수
 * @param disabled - 비활성화 여부
 * @param autoFocus - 자동 포커스 여부
 * @param defaultValue - 기본값
 */

export default function Input({
  tag: Tag = "input",
  inputType = "auth",
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  required,
  rows,
  disabled,
  autoFocus,
  defaultValue,
  ...props
}: Props) {
  return (
    <Tag
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      disabled={disabled}
      autoFocus={autoFocus}
      defaultValue={defaultValue}
      className={cn(
        {
          [baseStyle.concat(borderObject.auth)]: inputType === "auth",
          [baseStyle.concat(borderObject.modal)]: inputType === "modal",
          [baseStyle.concat(borderObject.search)]: inputType === "search",
        },
        className
      )}
      {...props}
    />
  );
}
