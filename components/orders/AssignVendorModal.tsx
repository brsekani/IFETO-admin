"use client";

import { X, Loader2 } from "lucide-react";
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

import { useGetAdminVendorsQuery } from "@/lib/features/vendors/vendorsApi";
import { useRouteOrderMutation } from "@/lib/features/orders/ordersApi";
import { toast } from "sonner";

export function AssignVendorModal({
  open,
  setOpen,
  orderId,
  onSuccess,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  orderId: string;
  onSuccess?: () => void;
}) {
  const { data: vendorsResponse, isLoading: isLoadingVendors } =
    useGetAdminVendorsQuery();
  const [routeOrder, { isLoading: isRouting }] = useRouteOrderMutation();

  const vendors = vendorsResponse?.data || [];
  const formik = useFormik({
    initialValues: {
      vendor: "",
    },
    validationSchema: Yup.object({
      vendor: Yup.string().required("Please select a vendor"),
    }),
    onSubmit: async (values) => {
      try {
        await routeOrder({ id: orderId, vendorId: values.vendor }).unwrap();
        toast.success("Vendor assigned successfully!");
        setOpen(false);
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to assign vendor.");
      }
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
                {isLoadingVendors ? (
                  <div className="p-2 text-sm text-gray-500">
                    Loading vendors...
                  </div>
                ) : vendors.length > 0 ? (
                  vendors.map((vendor: any) => (
                    <SelectItem key={vendor.id} value={vendor.vendorId}>
                      {vendor.businessName ||
                        vendor.user?.firstName ||
                        vendor.vendorId}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-gray-500">
                    No vendors found.
                  </div>
                )}
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
              disabled={!formik.isValid || !formik.values.vendor || isRouting}
              className={`flex-1 rounded-[8px] h-[48px] text-[18px] font-semibold ${
                formik.isValid && formik.values.vendor && !isRouting
                  ? "bg-[#27AE60] hover:bg-[#219150] text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isRouting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Submit"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
