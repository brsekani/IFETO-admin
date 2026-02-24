"use client";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { X } from "lucide-react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { RejectProductModal } from "./RejectProductModal";

export function ProductDetailsDrawer({ onClose }: { onClose: () => void }) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const BASE_PRICE = 2500;
  const SUGGESTED_PRICE = 2875;

  const formik = useFormik({
    initialValues: {
      overridePrice: "2875",
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
    onSubmit: (values) => {
      const finalPrice = values.overridePrice
        ? Number(values.overridePrice)
        : SUGGESTED_PRICE;

      console.log("Approved with price:", finalPrice);
      onClose();
    },
  });

  const handleRejectSubmit = (reason: string) => {
    console.log("Rejected with reason:", reason);

    // 🔥 Call your API here
    // await rejectProduct(productId, reason)

    setShowRejectModal(false);
    onClose();
  };

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
        <form onSubmit={formik.handleSubmit} className="h-full flex flex-col">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="px-4 py-8 space-y-6 border-[#EFEEEE] border-[0.6px] bg-[#FAFAFA] rounded-2xl">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-[120px] h-[120px] bg-[#EFEEEE] rounded-xl flex items-center justify-center">
                    <Image
                      src={authImg}
                      alt="Fresh Cabbage"
                      width={117.5}
                      height={85.14}
                    />
                  </div>

                  <div className="flex-1 space-y-2.5">
                    <h3 className="text-[20px] leading-[30px] text-[#2A2A2A] font-semibold">
                      Fresh Cabbage
                    </h3>

                    <div className="grid grid-cols-2 gap-y-2.5 text-sm mt-2">
                      <div className="space-y-2">
                        <p className="text-[#787878] text-[14px] leading-5">
                          Vendor
                        </p>
                        <p className="font-semibold text-[16px] leading-6 text-[#2A2A2A]">
                          Halimah Enterprise
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[#787878] text-[14px] leading-5">
                          Category
                        </p>
                        <p className="font-semibold text-[16px] leading-6 text-[#2A2A2A]">
                          Fruits & Vegetables
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[#787878] text-[14px] leading-5">
                          Inventory
                        </p>
                        <p className="font-semibold text-[16px] leading-6 text-[#2A2A2A]">
                          150kg
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[#787878] text-[14px] leading-5">
                          Status
                        </p>
                        <span className="px-4 py-1 text-sm rounded-full bg-[#F59E0B1A] text-[#F59E0B] font-medium">
                          Pending
                        </span>
                      </div>
                    </div>

                    <p className="font-medium text-[16px] leading-6 text-[#606060]">
                      Fresh cabbage, locally stored
                    </p>
                  </div>
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
                      ₦2,500.00
                    </p>
                    <p className="text-[#787878] text-[14px] leading-5">
                      per kg
                    </p>
                  </div>

                  <div className="bg-[#F59E0B0D] p-4 rounded-[10px] space-y-2">
                    <p className="text-[#787878] text-[14px] leading-5">
                      Global Markup
                    </p>
                    <p className="text-[16px] leading-6 font-semibold text-[#2A2A2A]">
                      +15%
                    </p>
                    <p className="text-[#787878] text-[14px] leading-5">
                      +₦375
                    </p>
                  </div>

                  <div className="bg-[#27AE600D] p-4 rounded-[10px] space-y-2 text-[#17683A]">
                    <p className="text-[14px] leading-5">
                      Suggested Final Price
                    </p>
                    <p className="text-[16px] leading-6 font-semibold">
                      ₦2,875.00
                    </p>
                    <p className="text-[14px] leading-5">per kg</p>
                  </div>
                </div>

                {/* Override Input */}
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
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 flex gap-4 text-[18px]">
            <button
              type="button"
              onClick={() => setShowRejectModal(true)}
              className="flex-1 h-[52px] border border-[#E53E3E] text-[#E53E3E] rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Reject
            </button>

            <button
              type="submit"
              className="flex-1 h-[52px] bg-[#27AE60] text-white rounded-lg font-semibold hover:bg-[#219150] transition"
            >
              Approve
            </button>
          </div>
        </form>
      </div>

      {showRejectModal && (
        <RejectProductModal
          onClose={() => setShowRejectModal(false)}
          onSubmitReject={handleRejectSubmit}
        />
      )}
    </>
  );
}
