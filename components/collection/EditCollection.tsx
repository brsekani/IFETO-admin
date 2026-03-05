"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import close from "@/assets/svgs/Close.svg";
import uploadIcon from "@/assets/svgs/export.svg";
import { CreateCategorySchema } from "@/utils/schema";

type EditCollectionProps = {
  onClose: () => void;
  category: {
    id: string;
    itemName: string;
    description: string;
    image: string; // existing image URL
  };
};

export default function EditCollection({
  onClose,
  category,
}: EditCollectionProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    category?.image || null,
  );

  const formik = useFormik({
    initialValues: {
      itemName: category?.itemName || "",
      description: category?.description || "",
    },

    validationSchema: CreateCategorySchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log("Updating ID:", category.id);

      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("description", values.description);

      // Example API call:
      // await updateCategory(category.id, formData);

      onClose();
    },
  });

  return (
    <div className="flex flex-col max-h-screen h-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-xl font-semibold text-[#1D2939]">
            Edit Category
          </h2>

          <button type="button" onClick={onClose}>
            <Image src={close} alt="close" className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
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
              className={`w-full px-4 py-3 rounded-lg border text-sm resize-none ${
                formik.touched.description && formik.errors.description
                  ? "border-[#B3261E]"
                  : "border-[#D0D5DD]"
              }`}
            />

            <div className="flex justify-between text-xs text-[#667085]">
              <span>{formik.values.description.length}/500</span>
            </div>

            {formik.touched.description && formik.errors.description && (
              <p className="text-xs text-[#B3261E]">
                {formik.errors.description}
              </p>
            )}
          </div>
        </div>

        {/* FOOTER */}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
