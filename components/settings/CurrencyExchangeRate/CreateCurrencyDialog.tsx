"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

type CreateCurrencyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const validationSchema = Yup.object({
  code: Yup.string()
    .required("Currency code is required")
    .max(3, "Must be 3 characters"),

  name: Yup.string().required("Currency name is required"),

  symbol: Yup.string().required("Currency symbol is required"),

  rate: Yup.number()
    .typeError("Must be a number")
    .required("Exchange rate is required")
    .positive("Must be positive"),
});

export function CreateCurrencyDialog({
  open,
  onOpenChange,
}: CreateCurrencyDialogProps) {
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      symbol: "",
      rate: "1",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("New Currency:", values);
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[445px] rounded-xl p-6"
      >
        <DialogHeader className="flex flex-row items-center justify-between mb-4">
          <DialogTitle className="text-[22px] font-semibold text-[#2A2A2A]">
            Add Currency
          </DialogTitle>

          <button onClick={() => onOpenChange(false)}>
            <X size={22} className="text-[#787878]" />
          </button>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Currency Code */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">Currency Code</label>

            <input
              name="code"
              placeholder="e.g USD"
              value={formik.values.code}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs">{formik.errors.code}</p>
            )}
          </div>

          {/* Currency Name */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">Currency Name</label>

            <input
              name="name"
              placeholder="e.g US Dollar"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {/* Currency Symbol */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">
              Currency Symbol
            </label>

            <input
              name="symbol"
              placeholder="e.g $"
              value={formik.values.symbol}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.symbol && formik.errors.symbol && (
              <p className="text-red-500 text-xs">{formik.errors.symbol}</p>
            )}
          </div>

          {/* Exchange Rate */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">
              Exchange Rate (Relative to base currency)
            </label>

            <input
              name="rate"
              type="number"
              value={formik.values.rate}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            <p className="text-[12px] text-[#7A869A]">
              1 USD = 1 of this currency
            </p>

            {formik.touched.rate && formik.errors.rate && (
              <p className="text-red-500 text-xs">{formik.errors.rate}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 border border-[#27AE60] text-[#27AE60] rounded-md font-semibold text-[18px] leading-7"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 h-12 bg-[#27AE60] text-white rounded-md font-semibold text-[18px] leading-7"
            >
              Add Currency
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
