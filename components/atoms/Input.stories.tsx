import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "입력해 주세요",
  },
};

export const AuthInput: Story = {
  args: {
    placeholder: "아이디 또는 이메일",
    usage: "auth",
  },
};

export const ModalInput: Story = {
  args: {
    placeholder: "이름 입력",
    usage: "modal",
  },
};

export const SearchInput: Story = {
  args: {
    placeholder: "편지 검색",
    usage: "search",
  },
};

export const TextArea: Story = {
  args: {
    placeholder: "자유롭게 입력하세요",
    tag: "textarea",
  },
};
