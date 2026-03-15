"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  adminNotifications: Yup.boolean(),
  maintenanceMode: Yup.boolean(),
});

export default function SystemSettings() {
  const formik = useFormik({
    initialValues: {
      adminNotifications: false,
      maintenanceMode: false,
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("System Settings:", values);
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
          System Settings
        </h1>

        <p className="text-[14px] text-[#787878]">
          Manage admin notifications and maintenance on IFETO
        </p>
      </div>

      {/* ADMIN NOTIFICATIONS */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Admin Notifications</h6>

          <p className="text-[12px] text-[#787878]">
            Email alerts for critical actions
          </p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="adminNotifications"
            checked={formik.values.adminNotifications}
            onChange={formik.handleChange}
            className="sr-only peer"
          />

          <div className="w-12 h-6 bg-gray-200 rounded-full peer-checked:bg-[#27AE60] transition"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* MAINTENANCE MODE */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] text-[#484848]">Maintenance Mode</h6>

          <p className="text-[12px] text-[#787878]">
            Take platform offline temporarily
          </p>
        </div>

        {/* Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={formik.values.maintenanceMode}
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
