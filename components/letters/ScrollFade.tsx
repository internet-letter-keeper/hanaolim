import { cn } from "@/lib/utils";

type Props = {
  position: "top" | "bottom";
  show: boolean;
};

export default function ScrollFade({ position, show }: Props) {
  if (!show) return;

  return (
    <div
      className={cn(
        "absolute left-0 w-full h-12 pointer-events-none z-10 from-white to-transparent",
        position === "top"
          ? "top-0 bg-gradient-to-b"
          : "bottom-0 bg-gradient-to-t"
      )}
    />
  );
}
