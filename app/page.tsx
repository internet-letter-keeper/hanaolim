import PrimaryButton from "@/components/atoms/PrimaryButton";

export default function Page() {
  return (
    <>
      홈
      <div className="flex flex-col gap-4 mx-5">
        <PrimaryButton
          title="하나은행"
          color="green"
          textSize="lg"
          weight="cm"
        />
        <PrimaryButton
          title="수빈 업"
          color="white"
          textSize="sm"
          weight="cm"
        />
      </div>
    </>
  );
}
