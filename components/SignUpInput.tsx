import { KeyboardEventHandler, Ref, ChangeEventHandler } from "react";
import { Input, Txt } from "@/components/atoms";

type Props = {
  label: string;
  value: string;
  placeholder: string;
  maxLength: number;
  error: boolean;
  errorMessage?: string;
  type?: string;
  customRef?: Ref<HTMLInputElement> | Ref<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function SignUpInput({
  label,
  value,
  onChange,
  onFocus,
  placeholder,
  maxLength,
  error,
  errorMessage,
  type = "text",
  customRef,
  onKeyDown,
}: Props) {
  return (
    <div className="flex flex-col gap-[14px]">
      <Txt size={19} weight="cm" align="left">
        {label}
      </Txt>
      <div className="flex flex-col gap-[10px]">
        <Input
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          maxLength={maxLength}
          type={type}
          customRef={customRef}
          onKeyDown={onKeyDown}
        />
        {error && errorMessage && (
          <Txt size={12} align="left" className="text-red-a76 ">
            {errorMessage}
          </Txt>
        )}
      </div>
    </div>
  );
}
