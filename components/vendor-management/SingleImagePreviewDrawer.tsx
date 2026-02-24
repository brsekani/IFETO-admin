"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface SingleImagePreviewDrawerProps {
  title: string;
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SingleImagePreviewDrawer({
  title,
  imageUrl,
  isOpen,
  onClose,
}: SingleImagePreviewDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-[640px] max-h-[1000px] h-full bg-[#F5F5F5] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-[18px] font-medium text-[#1A1A1A]">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-start justify-center px-6 py-6">
          <div className="relative w-full h-[400px] bg-gray-200">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Bottom Button */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-[#2FA55A] text-white py-3 rounded-md text-[16px] font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
