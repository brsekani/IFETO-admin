"use client";

import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const validationSchema = Yup.object({
  internationalShipping: Yup.boolean(),

  tier1: Yup.number().typeError("Must be a number").required("Required"),

  tier2: Yup.number().typeError("Must be a number").required("Required"),

  tier3: Yup.number().typeError("Must be a number").required("Required"),
});

export default function ShippingConfiguration() {
  const formik = useFormik({
    initialValues: {
      internationalShipping: true,
      tier1: "",
      tier2: "",
      tier3: "",
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("Shipping Settings:", values);
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
          Shipping Configuration
        </h1>

        <p className="text-[14px] text-[#787878]">
          Configure shipping costs by country and weight on IFETO
        </p>
      </div>

      {/* INTERNATIONAL SHIPPING */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">International Shipping</h6>

          <p className="text-[12px] text-[#787878]">
            Allow orders to be delivered outside Nigeria to enabled countries
          </p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="internationalShipping"
            checked={formik.values.internationalShipping}
            onChange={formik.handleChange}
            className="sr-only peer"
          />

          <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#27AE60] transition"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* SUPPORTED COUNTRIES */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">
            Supported Delivery Countries
          </h6>

          <p className="text-[12px] text-[#787878]">
            Configure which country IFETO ships to and assign each country to a
            shipping tier to control rates.
          </p>
        </div>

        <Link
          href="/settings/manage-countries"
          className="px-5 py-2.5 border border-[#27AE60] rounded-md text-[#27AE60] font-semibold"
        >
          Manage Countries
        </Link>
      </div>

      {/* TIER 1 */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Tier 1 Rate (0 - 5kg)</h6>

          <p className="text-[12px] text-[#787878]">Base rate per shipment</p>
        </div>

        <input
          type="text"
          name="tier1"
          placeholder="₦0.00"
          value={formik.values.tier1}
          onChange={formik.handleChange}
          className="w-[200px] h-12 border border-[#E5E5E5] rounded-md px-4 bg-[#F9FAFB]"
        />
      </div>

      {/* TIER 2 */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Tier 2 Rate (5 - 20kg)</h6>

          <p className="text-[12px] text-[#787878]">Base rate per shipment</p>
        </div>

        <input
          type="text"
          name="tier2"
          placeholder="₦0.00"
          value={formik.values.tier2}
          onChange={formik.handleChange}
          className="w-[200px] h-12 border border-[#E5E5E5] rounded-md px-4 bg-[#F9FAFB]"
        />
      </div>

      {/* TIER 3 */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Tier 3 Rate (20kg+)</h6>

          <p className="text-[12px] text-[#787878]">Base rate per shipment</p>
        </div>

        <input
          type="text"
          name="tier3"
          placeholder="₦0.00"
          value={formik.values.tier3}
          onChange={formik.handleChange}
          className="w-[200px] h-12 border border-[#E5E5E5] rounded-md px-4 bg-[#F9FAFB]"
        />
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
