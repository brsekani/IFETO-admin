"use client";

import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import close from "@/assets/svgs/Close.svg";
import uploadIcon from "@/assets/svgs/export.svg";
import { CreateCollectionSchema } from "@/utils/schema";

/* =========================
   YUP SCHEMA
========================= */

export default function CreateCollection({ onClose }: any) {
  const formik = useFormik({
    initialValues: {
      itemName: "",
      description: "",
    },

    validationSchema: CreateCollectionSchema, // Reusing add product schema
    enableReinitialize: true, // Important for populating data after fetch
    validateOnMount: false, // Don't validate immediately on mount to avoid red fields while loading

    onSubmit: async (values) => {
      console.log(values);

      // Example API usage
      /*
      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("description", values.description);
      formData.append("image", values.image as File);
      */
    },
  });

  return (
    <div className="flex flex-col max-h-screen h-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-xl font-semibold text-[#1D2939]">
            Create New Collection
          </h2>

          <button type="button" onClick={onClose}>
            <Image src={close} alt="close" className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {/* ITEM NAME */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#344054]">
              Collection Name
            </label>

            <input
              name="itemName"
              value={formik.values.itemName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g., Organic Tomatoes"
              className={`h-12 w-full px-4 rounded-lg border text-sm ${
                formik.touched.itemName && formik.errors.itemName
                  ? "border-[#B3261E]"
                  : "border-[#D0D5DD]"
              }`}
            />

            {formik.touched.itemName && formik.errors.itemName && (
              <p className="text-xs text-[#B3261E]">{formik.errors.itemName}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#344054]">
              Description <span className="text-[#B3261E]">*</span>
            </label>

            <textarea
              name="description"
              rows={4}
              maxLength={500}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Describe your product..."
              className={`w-full px-4 py-3 rounded-lg border text-sm resize-none ${
                formik.touched.description && formik.errors.description
                  ? "border-[#B3261E]"
                  : "border-[#D0D5DD]"
              }`}
            />

            <div className="flex justify-between text-xs text-[#667085]">
              <span>Minimum 10 characters</span>
              <span>{formik.values.description.length}/500</span>
            </div>

            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-[#B3261E]">
                {formik.errors.description}
              </p>
            )}
          </div>
        </div>

        {/* FIXED FOOTER */}
        <div className="p-6 flex gap-4 text-[18px]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-[52px] border border-[#27AE60] text-[#27AE60] rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="flex-1 h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold hover:bg-[#219150] transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
