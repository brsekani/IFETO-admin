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

export function AssignVendorModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const formik = useFormik({
    initialValues: {
      vendor: "",
    },
    validationSchema: Yup.object({
      vendor: Yup.string().required("Please select a vendor"),
    }),
    onSubmit: (values) => {
      console.log("Selected Vendor:", values.vendor);
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-[16px] p-6 max-w-[445px]">
        {/* Header */}
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="text-[22px] font-semibold">
            Assign Vendor
          </AlertDialogTitle>

          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </AlertDialogHeader>

        <form onSubmit={formik.handleSubmit}>
          {/* Body */}
          <div className="mt-4 flex flex-col gap-1">
            <label className="text-[14px] font-medium text-[#2A2A2A]">
              Assignee
            </label>

            <Select
              value={formik.values.vendor}
              onValueChange={(value) => formik.setFieldValue("vendor", value)}
            >
              <SelectTrigger
                className={`!h-[50px] rounded-[8px] w-full ${
                  formik.touched.vendor && formik.errors.vendor
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="Select Vendor" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="halimah">Halimah Enterprise</SelectItem>
                <SelectItem value="isaac">Isaac Farms</SelectItem>
                <SelectItem value="gospel">Gospel Venture</SelectItem>
              </SelectContent>
            </Select>

            {formik.touched.vendor && formik.errors.vendor && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.vendor}
              </p>
            )}
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
              disabled={!formik.isValid || !formik.values.vendor}
              className={`flex-1 rounded-[8px] h-[48px] text-[18px] font-semibold ${
                formik.isValid && formik.values.vendor
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
