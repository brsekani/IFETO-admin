"use client";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { X, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { RejectProductModal } from "./RejectProductModal";
import {
  Product,
  useApproveProductMutation,
  useRejectProductMutation,
} from "@/lib/features/products/productsApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { ActionSuccessModal } from "./ActionSuccessModal";

export function ProductDetailsDrawer({
  onClose,
  product,
}: {
  onClose: () => void;
  product: Product | null;
}) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [successModalState, setSuccessModalState] = useState({
    isOpen: false,
    title: "",
    description: "",
  });

  const handleCloseSuccessModal = () => {
    setSuccessModalState({ ...successModalState, isOpen: false });
    onClose();
  };

  const [approveProduct, { isLoading: isApproving }] =
    useApproveProductMutation();
  const [rejectProduct, { isLoading: isRejecting }] =
    useRejectProductMutation();

  const BASE_PRICE = product?.baseCost || 0;
  const SUGGESTED_PRICE = product?.sellingPrice || 0;
  const globalMarkupPercentage =
    BASE_PRICE > 0
      ? (((SUGGESTED_PRICE - BASE_PRICE) / BASE_PRICE) * 100).toFixed(0)
      : 0;

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-[#F59E0B1A] text-[#F59E0B]";
      case "APPROVED":
        return "bg-[#34C7591A] text-[#34C759]";
      case "REJECTED":
        return "bg-[#E53E3E1A] text-[#E53E3E]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formik = useFormik({
    initialValues: {
      overridePrice: SUGGESTED_PRICE.toString(),
    },
    validationSchema: Yup.object({
      overridePrice: Yup.string()
        .test("valid-number", "Enter a valid amount", (value) => {
          if (!value) return true;
          return !isNaN(Number(value.replace(/,/g, "")));
        })
        .test("positive", "Price must be greater than 0", (value) => {
          if (!value) return true;
          return Number(value) > 0;
        })
        .test(
          "min-base",
          `Price cannot be less than ₦${BASE_PRICE}`,
          (value) => {
            if (!value) return true;
            return Number(value) >= BASE_PRICE;
          },
        ),
    }),
    onSubmit: async (values) => {
      const finalPrice = values.overridePrice
        ? Number(values.overridePrice)
        : SUGGESTED_PRICE;

      if (!product) return;

      try {
        await approveProduct({
          id: product.id,
          sellingPriceOverride: finalPrice,
        }).unwrap();
        setSuccessModalState({
          isOpen: true,
          title: "Product Approved",
          description: "This product has been successfully approved",
        });
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to approve product");
      }
    },
  });

  const handleRejectSubmit = async (reason: string) => {
    if (!product) return;

    try {
      await rejectProduct({
        id: product.id,
        reason,
      }).unwrap();
      setShowRejectModal(false);
      setSuccessModalState({
        isOpen: true,
        title: "Product Rejected",
        description:
          "This product has been successfully rejected and reason sent to the vendor",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject product");
    }
  };

  if (!product) return null;

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-[24px] leading-8 text-[#2A2A2A] font-semibold">
            Product Details
          </h2>

          <button type="button" onClick={() => onClose()}>
            <X className="w-8 h-8 text-[#787878]" />
          </button>
        </div>

        {/* FORM WRAPPER */}
        <form
          onSubmit={formik.handleSubmit}
          className="flex-1 overflow-hidden flex flex-col"
        >
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="px-4 py-8 space-y-6 border-[#EFEEEE] border-[0.6px] bg-[#FAFAFA] rounded-2xl">
              <div className="space-y-6">
                {/* Images Gallery */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className="w-[120px] h-[120px] shrink-0 bg-[#EFEEEE] rounded-xl flex items-center justify-center overflow-hidden border border-gray-100 cursor-pointer hover:opacity-90 transition"
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - ${idx + 1}`}
                          width={120}
                          height={120}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="w-[120px] h-[120px] shrink-0 bg-[#EFEEEE] rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
                      <Image
                        src={authImg}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2.5">
                  <h3 className="text-[20px] leading-[30px] text-[#2A2A2A] font-semibold">
                    {product.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-y-2.5 text-sm mt-2">
                    <div className="space-y-2">
                      <p className="text-[#787878] text-[14px] leading-5">
                        Vendor
                      </p>
                      <p
                        className="font-semibold text-[16px] leading-6 text-[#2A2A2A] truncate"
                        title={
                          product.vendorProfile?.businessName ||
                          "Unknown Vendor"
                        }
                      >
                        {product.vendorProfile?.businessName ||
                          "Unknown Vendor"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[#787878] text-[14px] leading-5">
                        Category
                      </p>
                      <p
                        className="font-semibold text-[16px] leading-6 text-[#2A2A2A] truncate"
                        title={product.category?.name || "Uncategorized"}
                      >
                        {product.category?.name || "Uncategorized"}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[#787878] text-[14px] leading-5">
                        Inventory
                      </p>
                      <p className="font-semibold text-[16px] leading-6 text-[#2A2A2A]">
                        {product.quantity}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[#787878] text-[14px] leading-5">
                        Status
                      </p>
                      <span
                        className={`px-4 py-1 flex max-w-max text-sm rounded-full font-medium capitalize ${getStatusStyle(product.approvalStatus)}`}
                      >
                        {product.approvalStatus.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  <p className="font-medium text-[16px] leading-6 text-[#606060]">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price Configuration */}
              <div className="space-y-3">
                <h3 className="text-[20px] leading-7.5 text-[#2A2A2A] font-semibold">
                  Price Configuration
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#EFEEEE80] p-4 rounded-[10px] space-y-2">
                    <p className="text-[#787878] text-[14px] leading-5">
                      Base Price
                    </p>
                    <p className="text-[16px] leading-6 font-semibold text-[#2A2A2A]">
                      ₦{BASE_PRICE.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#F59E0B0D] p-4 rounded-[10px] space-y-2">
                    <p className="text-[#787878] text-[14px] leading-5">
                      Global Markup
                    </p>
                    <p className="text-[16px] leading-6 font-semibold text-[#2A2A2A]">
                      +{globalMarkupPercentage}%
                    </p>
                    <p className="text-[#787878] text-[14px] leading-5">
                      +₦{(SUGGESTED_PRICE - BASE_PRICE).toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-[#27AE600D] p-4 rounded-[10px] space-y-2 text-[#17683A]">
                    <p className="text-[14px] leading-5">
                      Suggested Final Price
                    </p>
                    <p className="text-[16px] leading-6 font-semibold">
                      ₦{SUGGESTED_PRICE.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Override Input */}
                {product.approvalStatus !== "APPROVED" &&
                  product.approvalStatus !== "REJECTED" && (
                    <div className="space-y-2">
                      <label className="text-[14px] leading-5 font-medium text-[#2A2A2A]">
                        Override Selling Price (Optional)
                      </label>

                      <input
                        type="text"
                        name="overridePrice"
                        value={formik.values.overridePrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full h-[56px] border rounded-lg px-4 text-[14px] leading-5 font-medium text-[#2A2A2A] ${
                          formik.touched.overridePrice &&
                          formik.errors.overridePrice
                            ? "border-red-500"
                            : ""
                        }`}
                      />

                      {formik.touched.overridePrice &&
                        formik.errors.overridePrice && (
                          <p className="text-[14px] leading-5 text-red-500">
                            {formik.errors.overridePrice}
                          </p>
                        )}

                      <p className="text-[14px] leading-5 font-medium text-[#667185]">
                        Leave price as suggested or enter a custom selling price
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Rejection Reason Box */}
            {product.approvalStatus === "REJECTED" &&
              product.rejectionReason && (
                <div className="bg-[#FEF3F2] border-l-4 border-[#D92D20] p-4 rounded-lg mt-6">
                  <div className="flex gap-2 items-center text-[#D92D20] font-semibold text-[14px] leading-5 mb-1.5">
                    <AlertTriangle className="w-5 h-5" />
                    <p>Rejection Reason:</p>
                  </div>
                  <p className="text-[#667185] text-[14px] leading-5 ml-7">
                    {product.rejectionReason}
                  </p>
                </div>
              )}

            {/* Footer Buttons */}
            <div className="flex gap-4 text-[18px] p-6 border-t border-[#EFEEEE] bg-white flex-shrink-0 mt-6 md:mt-auto">
              {product.approvalStatus === "APPROVED" ||
              product.approvalStatus === "REJECTED" ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold hover:bg-[#219150] transition"
                >
                  Close
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(true)}
                    disabled={isApproving || isRejecting}
                    className="flex-1 h-[52px] border border-[#E53E3E] text-[#E53E3E] rounded-lg font-semibold hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>

                  <button
                    type="submit"
                    disabled={isApproving || isRejecting}
                    className="flex-1 h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold hover:bg-[#219150] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isApproving && (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {showRejectModal && (
        <RejectProductModal
          onClose={() => setShowRejectModal(false)}
          onSubmitReject={handleRejectSubmit}
          isRejecting={isRejecting}
        />
      )}

      {/* Modal Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#EFEEEE]">
              <h3 className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
                Product Image
              </h3>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-[#787878] hover:text-[#2A2A2A] transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative w-full aspect-square md:aspect-video bg-[#FAFAFA]">
              <Image
                src={selectedImage}
                alt="Product View"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <ActionSuccessModal
        isOpen={successModalState.isOpen}
        onClose={handleCloseSuccessModal}
        title={successModalState.title}
        description={successModalState.description}
      />
    </>
  );
}
