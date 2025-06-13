import OnboardingCard from "@/components/OnboardingCard";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col my-4 gap-y-4 items-center">
      <OnboardingCard mode={"soldier"} />
      <OnboardingCard mode={"viewer"} />
    </div>
  );
}
