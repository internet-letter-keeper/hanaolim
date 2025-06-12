import Image from "next/image";
import Text from "./components/atoms/text";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Text weight="bold" size="xl">
        하나은행 bold
      </Text>
      <Text weight="light" size="sm">
        하나은행 light
      </Text>
      <Text weight="cm">하나은행 cm</Text>
    </div>
  );
}
