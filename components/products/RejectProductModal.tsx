"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  onClose: () => void;
  onSubmitReject: (reason: string) => void;
}

export function RejectProductModal({ onClose, onSubmitReject }: Props) {
  const formik = useFormik({
    initialValues: { reason: "" },
    validationSchema: Yup.object({
      reason: Yup.string()
        .required("Rejection reason is required")
        .min(10, "Reason must be at least 10 characters"),
    }),
    onSubmit: (values) => {
      onSubmitReject(values.reason);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[445px] bg-white rounded-2xl p-6 space-y-6 shadow-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <h3 className="text-[14px] leading-5 font-semibold text-[#2A2A2A]">
            Rejection Reason
          </h3>
          <div className="space-y-1">
            <textarea
              name="reason"
              rows={4}
              placeholder="Enter reason for rejection"
              value={formik.values.reason}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg p-4 text-[14px] resize-none ${
                formik.touched.reason && formik.errors.reason
                  ? "border-red-500"
                  : "border-[#D0D5DD]"
              }`}
            />

            {formik.touched.reason && formik.errors.reason && (
              <p className="text-sm text-red-500">{formik.errors.reason}</p>
            )}
          </div>

          <div className="flex gap-4 text-[18px]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-[52px] border border-[#27AE60] text-[#27AE60] rounded-lg font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 h-[52px] bg-[#E53E3E] text-white rounded-lg font-semibold"
            >
              Reject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
