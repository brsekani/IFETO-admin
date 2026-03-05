"use client";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import arrowLeft from "@/assets/svgs/arrow-left.svg";

import { ChevronLeft, AlertTriangle } from "lucide-react";
import Image from "next/image";

type DeleteCategoryDialogProps = {
  open: boolean;
  id: string;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
};

export function DeleteCategoryDialog({
  open,
  id,
  onOpenChange,
  onDelete,
}: DeleteCategoryDialogProps) {
  console.log(id);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[445px] rounded-2xl p-8 text-center">
        {/* Back */}
        <div className="flex items-center gap-2">
          <Image src={arrowLeft} alt="arrow-back" />
          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            back
          </p>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Header */}
        <h6 className="text-[#2A2A2A] text-[18px] leading-7 font-semibold">
          Delete Category
        </h6>

        {/* Description */}
        <p className="text-[16px] leading-6 text-[#787878] mb-4">
          Are you sure you want to delete this category?
        </p>

        <div className="flex gap-4 text-[18px]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 h-[48px] border border-[#27AE60] text-[#27AE60] rounded-lg font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 h-[48px] bg-[#E53E3E] text-white rounded-lg font-semibold"
          >
            Delete
          </button>
        </div>
        {/* Footer */}
      </AlertDialogContent>
    </AlertDialog>
  );
}
