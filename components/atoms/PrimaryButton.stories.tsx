import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PrimaryButton from "./PrimaryButton";

const meta: Meta<typeof PrimaryButton> = {
  title: "Components/Atoms/PrimaryButton",
  component: PrimaryButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    title: "기본 버튼",
  },
};

export const Green: Story = {
  args: {
    title: "확인",
    color: "green",
  },
};

export const White: Story = {
  args: {
    title: "취소",
    color: "white",
  },
};

export const GrayDisabled: Story = {
  args: {
    title: "비활성화",
    color: "gray",
    disabled: true,
  },
};
