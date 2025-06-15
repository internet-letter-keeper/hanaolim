"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { fontMap } from "@/components/atoms/Text";
import BasicHeader from "@/components/common/BasicHeader";

export default function LettersPage() {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send");

  return (
    <>
      <BasicHeader title="편지 보관함" />

      <div className={cn("bg-white-7f9 py-4", fontMap.cm)}>
        <div className="flex justify-center gap-2">
          <Button
            className={cn(
              "flex justify-center items-center w-[170px] h-[50px] py-[14px] px-0 shrink-0 rounded-lg text-sm",
              activeTab === "send"
                ? "bg-green-49d text-white"
                : "bg-white-2f2 text-green-49d"
            )}
            onClick={() => setActiveTab("send")}
          >
            내 관물대로 퐁당
          </Button>

          <Button
            className={cn(
              "flex justify-center items-center w-[170px] h-[50px] py-[14px] px-0 shrink-0 rounded-lg text-sm",
              activeTab === "receive"
                ? "bg-green-49d text-white"
                : "bg-white-2f2 text-green-49d"
            )}
            onClick={() => setActiveTab("receive")}
          >
            친구 관물대
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          <Input
            placeholder="작성자, 내용 ..."
            inputType="search"
            className="w-[336px]"
          />
        </div>
      </div>
    </>
  );
}
