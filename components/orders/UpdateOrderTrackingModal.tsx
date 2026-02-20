"use client";

import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

export function UpdateOrderTrackingModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
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
    },
  });

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) formik.resetForm();
        setOpen(value);
      }}
    >
      <AlertDialogContent className="rounded-[16px] p-6 max-w-[445px]">
        {/* Header */}
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="text-[22px] font-semibold">
            Update Order Tracking
          </AlertDialogTitle>

          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </AlertDialogHeader>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 flex flex-col gap-4">
            {/* Email (Read Only) */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-medium text-[#2A2A2A]">
                Customer Email
              </label>
              <input
                type="email"
                value={formik.values.email}
                disabled
                className="h-[50px] rounded-[8px] border px-4 bg-gray-100 text-gray-500"
              />
            </div>

            {/* Status Select */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] font-medium text-[#2A2A2A]">
                Change Order Status
              </label>

              <Select
                value={formik.values.status}
                onValueChange={(value) => formik.setFieldValue("status", value)}
              >
                <SelectTrigger
                  className={`!h-[50px] rounded-[8px] w-full ${
                    formik.touched.status && formik.errors.status
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Placed" />
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

              <Textarea
                placeholder="Enter comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                name="comment"
                className={`min-h-[120px] rounded-[8px] max-h-[114px] ${
                  formik.touched.comment && formik.errors.comment
                    ? "border-red-500"
                    : ""
                }`}
              />

              {formik.touched.comment && formik.errors.comment && (
                <p className="text-red-500 text-sm">{formik.errors.comment}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <AlertDialogFooter className="mt-10 flex justify-between gap-4">
            <AlertDialogCancel
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 border border-[#27AE60] text-[#27AE60] bg-transparent hover:bg-[#E9F7EF] rounded-[8px] h-[48px] text-[18px] font-semibold"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              disabled={!formik.isValid}
              className={`flex-1 rounded-[8px] h-[48px] text-[18px] font-semibold ${
                formik.isValid
                  ? "bg-[#27AE60] hover:bg-[#219150] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
