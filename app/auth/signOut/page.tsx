"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Txt } from "@/components/atoms";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      router.push("/auth/signIn");
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Txt>로그아웃 중입니다...</Txt>
    </div>
  );
}
