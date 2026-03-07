"use client";

import { Check } from "lucide-react";

interface ActionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function ActionSuccessModal({
  isOpen,
  onClose,
  title,
  description,
}: ActionSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-[#E3FFEF] rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-[#27AE60]" strokeWidth={2.5} />
        </div>

        <h3 className="text-[20px] leading-7 font-semibold text-[#2A2A2A] mb-3">
          {title}
        </h3>

        <p className="text-[14px] leading-5 text-[#787878] mb-8 w-full max-w-[280px]">
          {description}
        </p>

        <button
          onClick={onClose}
          className="w-full h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold text-[16px] hover:bg-[#219150] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
