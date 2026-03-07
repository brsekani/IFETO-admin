"use client";

import Image from "next/image";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import close from "@/assets/svgs/Close.svg";
import uploadIcon from "@/assets/svgs/export.svg";
import { CreateCategorySchema } from "@/utils/schema";

type EditCategoryProps = {
  onClose: () => void;
  category: {
    id: string;
    itemName: string;
    description: string;
    image: string; // existing image URL
  };
};

export default function EditCategory({ onClose, category }: EditCategoryProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(
    category?.image || null,
  );

  const formik = useFormik({
    initialValues: {
      itemName: category?.itemName || "",
      description: category?.description || "",
      image: null as File | null, // only new uploaded image
    },

    validationSchema: CreateCategorySchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log("Updating ID:", category.id);

      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("description", values.description);

      // Only append image if user uploaded new one
      if (values.image) {
        formData.append("image", values.image);
      }

      // Example API call:
      // await updateCategory(category.id, formData);

      onClose();
    },
  });

  /* =========================
     IMAGE HANDLING
  ========================= */

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setPreviewImage(null);
  };

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
              Category Name <span className="text-[#B3261E]">*</span>
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

          {/* IMAGE */}
          <div className="flex flex-col gap-2">
            <input
              id="imageUpload"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              hidden
              onChange={(e) =>
                handleImageUpload(e.currentTarget.files?.[0] || null)
              }
            />

            <label className="text-sm font-medium text-[#344054]">
              Upload Image
            </label>

            {!previewImage ? (
              <div
                onClick={() => document.getElementById("imageUpload")?.click()}
                className="border border-dashed border-[#D0D5DD] rounded-xl p-8 text-center cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3 text-[#667085]">
                  <Image src={uploadIcon} alt="upload" className="w-8 h-8" />
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs text-[#98A2B3]">
                    Max 5MB (PNG, JPG, WEBP)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative h-[200px] w-full rounded-xl overflow-hidden border">
                <img
                  src={previewImage}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 h-8 w-8 bg-black/70 text-white rounded-full"
                >
                  ✕
                </button>
              </div>
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
