"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  markup: Yup.number().typeError("Must be a number").required("Required"),

  minimumPayment: Yup.number()
    .typeError("Must be a number")
    .required("Required"),

  autoApproveVendors: Yup.boolean(),

  kycRequired: Yup.boolean(),
});

export default function PlatformEconomics() {
  const formik = useFormik({
    initialValues: {
      markup: "",
      minimumPayment: "",
      autoApproveVendors: false,
      kycRequired: false,
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("Platform Settings:", values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-10 bg-white border border-[#E5E5E5] rounded-[14px] p-8"
    >
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-[24px] font-semibold text-[#2A2A2A]">
          Platform Economics
        </h1>

        <p className="text-[14px] text-[#787878]">
          Configure global markup percentage and others on IFETO
        </p>
      </div>

      {/* GLOBAL MARKUP */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">
            Global Markup Percentage
          </h6>

          <p className="text-[12px] text-[#787878]">
            Applied on top of vendor prices
          </p>
        </div>

        <input
          type="text"
          name="markup"
          placeholder="0%"
          value={formik.values.markup}
          onChange={formik.handleChange}
          className="w-[200px] h-12 border border-[#E5E5E5] rounded-md px-4 bg-[#F9FAFB] text-[14px] leading-5 text-[#2A2A2A]"
        />
      </div>

      {/* MINIMUM PAYMENT */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">
            Minimum Payment Threshold
          </h6>

          <p className="text-[12px] text-[#787878]">
            Minimum balance before vendor can request payout
          </p>
        </div>

        <input
          type="text"
          name="minimumPayment"
          placeholder="₦0.00"
          value={formik.values.minimumPayment}
          onChange={formik.handleChange}
          className="w-[200px] h-12 border border-[#E5E5E5] rounded-md px-4 bg-[#F9FAFB] text-[14px] leading-5 text-[#2A2A2A]"
        />
      </div>

      {/* AUTO APPROVE VENDORS */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Auto Approve Vendors</h6>

          <p className="text-[12px] text-[#787878]">
            Skip manual product review
          </p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="autoApproveVendors"
            checked={formik.values.autoApproveVendors}
            onChange={formik.handleChange}
            className="sr-only peer"
          />

          <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#27AE60] transition"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* KYC REQUIRED */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">
            KYC Verification Required
          </h6>

          <p className="text-[12px] text-[#787878]">
            Mandatory for all vendors
          </p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="kycRequired"
            checked={formik.values.kycRequired}
            onChange={formik.handleChange}
            className="sr-only peer"
          />

          <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#27AE60] transition"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          className="w-full h-12 border border-[#27AE60] text-[#27AE60] rounded-md font-semibold text-[18px] leading-7"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full h-12 bg-[#27AE60] text-white rounded-md font-semibold text-[18px] leading-7"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
}
