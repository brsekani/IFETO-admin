"use client";

import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon: StaticImageData;
  buttonText?: string;
}

export function SuccessModal({
  open,
  onClose,
  title,
  message,
  icon,
  buttonText = "Close",
}: SuccessModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl w-full max-w-[445px] p-6 text-center shadow-lg">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#27AE60]/15 flex items-center justify-center">
              <Image src={icon} alt="status-icon" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
            {title}
          </h2>

          {/* Message */}
          <p className="mt-4 text-[16px] leading-6 text-[#787878]">{message}</p>

          {/* Button */}
          <button
            onClick={onClose}
            className="mt-6 w-full h-12 rounded-[8px] bg-[#27AE60] hover:bg-[#219150] text-white text-[18px] font-semibold transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
