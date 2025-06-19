"use client";

import { useState } from "react";
import LetterModal from "@/components/letters/LetterModal";

export default function ModalWrapper() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        모달 열고 포인트 적립!
      </button>

      {isModalOpen && (
        <LetterModal letterId={"1"} onHandleModal={() => setModalOpen(false)} />
      )}
    </div>
  );
}
