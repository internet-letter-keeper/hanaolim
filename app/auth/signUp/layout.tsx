import { PropsWithChildren, Suspense } from "react";
import { Txt } from "@/components/atoms";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center size-full">
          <Txt>로딩 중...</Txt>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
