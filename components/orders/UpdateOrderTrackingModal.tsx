"use client";

import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UpdateOrderTrackingModal({
  open,
  setOpen,
  setSuccessOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  setSuccessOpen: (value: boolean) => void;
}) {
  const formik = useFormik({
    initialValues: {
      email: "Gabriel.isaac@example.com",
      status: "",
      comment: "",
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Order status is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      console.log("Update Tracking Payload:", values);
      setOpen(false);
      setSuccessOpen(true);
    },
  });

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-[16px] p-6 max-w-[445px] w-full relative shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-[22px] font-semibold">Update Order Tracking</h2>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-[#2A2A2A]">
                  Customer Email
                </label>
                <input
                  type="email"
                  value={formik.values.email}
                  disabled
                  className="h-[50px] rounded-[8px] border px-4 bg-gray-100 text-gray-500 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-[#2A2A2A]">
                  Change Order Status
                </label>

                <Select
                  value={formik.values.status}
                  onValueChange={(value) =>
                    formik.setFieldValue("status", value)
                  }
                >
                  <SelectTrigger
                    className={`!h-[50px] rounded-[8px] w-full ${
                      formik.touched.status && formik.errors.status
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                {formik.touched.status && formik.errors.status && (
                  <p className="text-red-500 text-sm">{formik.errors.status}</p>
                )}
              </div>

              {/* Comment */}
              <div className="flex flex-col gap-1">
                <label className="text-[14px] font-medium text-[#2A2A2A]">
                  Comment
                </label>

                <textarea
                  name="comment"
                  placeholder="Enter comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`min-h-[120px] max-h-[120px] rounded-[8px] border px-4 py-3 w-full resize-none ${
                    formik.touched.comment && formik.errors.comment
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                {formik.touched.comment && formik.errors.comment && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.comment}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 flex gap-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 border border-[#27AE60] text-[#27AE60] bg-transparent hover:bg-[#E9F7EF] rounded-[8px] h-[48px] text-[18px] font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!formik.isValid}
                className={`flex-1 rounded-[8px] h-[48px] text-[18px] font-semibold ${
                  formik.isValid
                    ? "bg-[#27AE60] hover:bg-[#219150] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
