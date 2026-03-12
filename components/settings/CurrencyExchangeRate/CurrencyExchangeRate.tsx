"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import add from "@/assets/svgs/add-green.svg";
import { useState } from "react";
import { CreateCurrencyDialog } from "./CreateCurrencyDialog";

const validationSchema = Yup.object({
  baseCurrency: Yup.string().required("Base currency is required"),

  exchangeRates: Yup.array().of(
    Yup.object({
      rate: Yup.number()
        .typeError("Must be a number")
        .required("Exchange rate is required")
        .positive("Must be positive"),
    }),
  ),

  multiCurrency: Yup.boolean(),
});

export default function CurrencyExchangeRate() {
  const [openCreateCurrencyDialog, setOpenCreateCurrencyDialog] =
    useState(false);

  const backendRates = [
    { from: "USD", to: "NGN", rate: 1595.5 },
    { from: "USD", to: "EUR", rate: 0.92 },
    { from: "USD", to: "GBP", rate: 0.78 },
  ];

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      baseCurrency: "",
      exchangeRates: backendRates,
      multiCurrency: false,
    },

    validationSchema,

    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 bg-[#FFFFFF] p-6 rounded-lg"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-[24px] leading-8 text-[#2A2A2A] font-semibold">
            Currency & Exchange Rate
          </h1>

          <p className="text-[14px] leading-5 text-[#787878]">
            Manage base currency and see exchange rates on IFETO
          </p>
        </div>

        <div
          onClick={() => setOpenCreateCurrencyDialog(true)}
          className="px-5 py-2.5 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold hidden md:flex items-center gap-2.5 cursor-pointer w-fit"
        >
          <Image src={add} alt="add-icon" />
          Add Currency
        </div>
      </div>

      {/* BASE CURRENCY */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] leading-6 text-[#484848]">
            Base Currency
          </h6>

          <p className="text-[12px] leading-4.5 text-[#484848]">
            Primary currency for all transactions
          </p>
        </div>

        <div>
          <Select
            value={formik.values.baseCurrency}
            onValueChange={(value) =>
              formik.setFieldValue("baseCurrency", value)
            }
          >
            <SelectTrigger className="w-[181px] !h-14 text-[16px] font-semibold">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="USD">$ USD</SelectItem>
                <SelectItem value="NGN">₦ NGN</SelectItem>
                <SelectItem value="EUR">€ EUR</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {formik.touched.baseCurrency && formik.errors.baseCurrency && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.baseCurrency}
            </p>
          )}
        </div>
      </div>

      {/* EXCHANGE RATES */}
      {formik.values.exchangeRates.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div>
            <h6 className="text-[16px] leading-6 text-[#484848]">
              {item.from} → {item.to}
            </h6>

            <p className="text-[12px] leading-4.5 text-[#484848]">
              Manually override exchange rate
            </p>
          </div>

          <div>
            <input
              type="text"
              name={`exchangeRates.${index}.rate`}
              value={formik.values.exchangeRates[index].rate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-[181px] !h-14 text-[16px] border border-[#CFCFCF] px-4 rounded-[6px]"
            />

            {formik.touched.exchangeRates?.[index]?.rate &&
              formik.errors.exchangeRates?.[index]?.rate && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.exchangeRates[index].rate}
                </p>
              )}
          </div>
        </div>
      ))}

      {/* MULTI CURRENCY TOGGLE */}
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-[16px] leading-6 text-[#484848]">
            Multi-Currency Support
          </h6>

          <p className="text-[12px] leading-4.5 text-[#484848]">
            Allow vendors to price in multiple currencies
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="multiCurrency"
            checked={formik.values.multiCurrency}
            onChange={formik.handleChange}
            className="sr-only peer"
          />

          <div className="w-12 h-6 bg-[#E5E5E5] rounded-full peer-checked:bg-[#27AE60] transition-colors"></div>

          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* BUTTONS */}
      <div className="w-full flex flex-row gap-2 py-4">
        <button
          type="button"
          className="border border-[#27AE60] w-full text-[#27AE60] h-12 rounded-[6px] text-[18px] font-semibold"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="w-full bg-[#27AE60] h-12 rounded-[6px] text-[18px] font-semibold text-white"
        >
          Save Settings
        </button>
      </div>

      <CreateCurrencyDialog
        open={openCreateCurrencyDialog}
        onOpenChange={setOpenCreateCurrencyDialog}
        onCreate={() => {
          console.log("Deleted!");
          setOpenCreateCurrencyDialog(false);
        }}
      />
    </form>
  );
}
