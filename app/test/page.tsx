"use client";

import { useState } from "react";
import LetterModal from "@/components/letters/LetterModal";

export default function ModalWrapper() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPoint, setShowPoint] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
    setShowPoint(true);
    setTimeout(() => setShowPoint(false), 700); // 애니메이션만 잠깐 띄움
  };

  return (
    <div className="relative">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        모달 열고 포인트 적립!
      </button>

      {isModalOpen && (
        <LetterModal letterId={"1"} onHandleModal={() => setModalOpen(false)} />
      )}
    </div>
  );
}
