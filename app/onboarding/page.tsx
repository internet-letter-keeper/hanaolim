import OnboardingOption from "@/components/OnboardingOption";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col  my-4 gap-y-4 items-center">
      <div>
        <OnboardingOption
          title={"나를 군인으로 등록하기"}
          label={"등록하기"}
          imgSrc={"/images/ic-byeoldol-face.svg"}
          color={"green"}
        />
      </div>
      <div>
        <OnboardingOption
          title={"보고 싶은 군인 추가하기"}
          label={"추가하기"}
          imgSrc={"/images/ic-letter.svg"}
          color={"blue"}
        />
      </div>
    </div>
  );
}
