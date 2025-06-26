import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Text from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Atoms/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "기본 텍스트",
  },
};

export const Sizes: Story = {
  args: {
    children: "크기 20px 텍스트",
    size: 20,
  },
};

export const HeavyText: Story = {
  args: {
    children: "Heavy 텍스트",
    weight: "heavy",
  },
};

export const CmText: Story = {
  args: {
    children: "Cm 텍스트",
    weight: "cm",
  },
};

export const AlignLeft: Story = {
  args: {
    children: "왼쪽 정렬 텍스트",
    align: "left",
  },
};
