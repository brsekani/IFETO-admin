"use client";

import { X, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBulkUpdateProductPricesMutation } from "@/lib/features/products/productsApi";

interface Props {
  onClose: () => void;
}

export function GlobalMarkupModal({ onClose }: Props) {
  const [percentage, setPercentage] = useState<number>(15);
  const [bulkUpdate, { isLoading }] = useBulkUpdateProductPricesMutation();

  const EXAMPLE_BASE_PRICE = 2500;
  const exampleFinalPrice = EXAMPLE_BASE_PRICE * (1 + percentage / 100);

  const handleSubmit = async () => {
    try {
      await bulkUpdate({ percentage }).unwrap();
      toast.success("Global markup applied successfully to all products");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update product prices");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] bg-white rounded-2xl p-6 shadow-xl flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[20px] leading-7 font-semibold text-[#2A2A2A]">
            Global Percentage Markup
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#787878] hover:text-[#2A2A2A] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-[14px] leading-5 text-[#667185] mb-6">
          Set the default percentage increase for all product base prices.
        </p>

        <div className="space-y-4 mb-6">
          <label className="text-[14px] leading-5 font-medium text-[#667185]">
            Markup Percentage
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#27AE60]"
            />
            <div className="bg-[#27AE600D] text-[#27AE60] font-semibold text-[16px] px-3 py-1.5 rounded-md min-w-[60px] text-center">
              {percentage}%
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAFA] border border-[#EFEEEE] rounded-xl p-4 mb-6 space-y-2">
          <p className="text-[14px] leading-5 text-[#787878]">
            Example Calculation:
          </p>
          <div className="flex items-center gap-2 text-[16px] leading-6 font-medium text-[#2A2A2A]">
            <span>
              Base Price: ₦
              {EXAMPLE_BASE_PRICE.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-[#A0A0A0]">→</span>
            <span>
              Final Price:{" "}
              <span className="text-[#27AE60]">
                ₦
                {exampleFinalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold text-[16px] hover:bg-[#219150] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          Save Markup Settings
        </button>
      </div>
    </div>
  );
}
