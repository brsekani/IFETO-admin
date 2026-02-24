"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImagePreviewDrawerProps {
  title: string;
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function ImagePreviewDrawer({
  title,
  images,
  isOpen,
  onClose,
}: ImagePreviewDrawerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const hasMultiple = images.length > 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="w-full max-w-md h-full bg-[#F2F2F2] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-[18px] font-medium text-[#1A1A1A]">{title}</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="flex-1 flex items-center justify-center px-6 py-6">
          <div className="relative w-full h-[380px] bg-gray-200">
            <Image
              src={images[currentIndex]}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Pagination */}
        {hasMultiple && (
          <div className="flex items-center justify-between px-10 mb-8">
            <button onClick={handlePrev}>
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>

            <span className="text-[16px] text-[#333]">
              {currentIndex + 1}/{images.length}
            </span>

            <button onClick={handleNext}>
              <ChevronRight className="w-5 h-5 text-green-600" />
            </button>
          </div>
        )}

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
