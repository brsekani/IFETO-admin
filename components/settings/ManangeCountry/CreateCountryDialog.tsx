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

type CreateCountryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Country name is required"),

  code: Yup.string()
    .required("Country code is required")
    .max(3, "Must be 3 characters"),

  region: Yup.string().required("Region is required"),
});

export function CreateCountryDialog({
  open,
  onOpenChange,
}: CreateCountryDialogProps) {
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      region: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("New Country:", values);
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
            Add Country
          </DialogTitle>

          <button type="button" onClick={() => onOpenChange(false)}>
            <X size={22} className="text-[#787878]" />
          </button>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Country Name */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">Country Name</label>

            <input
              name="name"
              placeholder="e.g Nigeria"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {/* Country Code */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">Country Code</label>

            <input
              name="code"
              placeholder="e.g NG"
              value={formik.values.code}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.code && formik.errors.code && (
              <p className="text-red-500 text-xs">{formik.errors.code}</p>
            )}
          </div>

          {/* Region */}
          <div className="space-y-1">
            <label className="text-[14px] text-[#484848]">Region</label>

            <input
              name="region"
              placeholder="e.g West Africa"
              value={formik.values.region}
              onChange={formik.handleChange}
              className="w-full h-12 border border-[#E5E5E5] rounded-md px-4"
            />

            {formik.touched.region && formik.errors.region && (
              <p className="text-red-500 text-xs">{formik.errors.region}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-12 border border-[#27AE60] text-[#27AE60] rounded-md font-semibold text-[18px]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 h-12 bg-[#27AE60] text-white rounded-md font-semibold text-[18px]"
            >
              Add Country
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
