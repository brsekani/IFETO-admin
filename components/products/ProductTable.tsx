"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemsPerPage } from "../Table/ItemsPerPage";
import Table, { Column } from "../Table/Table";
import Link from "next/link";
import Image from "next/image";
import eyeGreen from "@/assets/svgs/eye-green.svg";
import dangerOrange from "@/assets/svgs/danger-orange.svg";
import Pagination from "../general/Pagination";
import authImg from "@/assets/images/IFETO-Logo-1.png";
import RightDrawer from "../general/RightDrawer";
import { useState } from "react";
import ViewProduct, { ProductDetailsDrawer } from "./ProductDetailsDrawer";

type productstatus =
  | "placed"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

type Order = {
  id: string;
  customer: string;
  amount: number;
  vendor: {
    name: string;
    assigned: boolean;
  };
  status: productstatus;
  payout: "Eligible" | "-";
};

type ProductTableProps = {
  products: Order[];
  isLoading: boolean;
};

export default function ProductTable({
  products,
  isLoading,
}: ProductTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);
  const [openViewProduct, setViewProduct] = useState(false);

  const statusMap = {
    pending: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),

    processing: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Processing
      </span>
    ),

    shipped: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#2E0BF51A] text-[#2E0BF5]">
        Shipped
      </span>
    ),

    paid: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Paid
      </span>
    ),

    cancelled: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Cancelled
      </span>
    ),
  };

  const columns: Column<Order>[] = [
    {
      header: "Product Name",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[48px] rounded-[6px] bg-[#EFEEEE] flex items-center justify-center">
            <Image
              src={authImg}
              alt={row.vendor.name}
              width={51}
              height={43}
              className="object-contain"
            />
          </div>

          <p className="text-[14px] leading-5 font-medium text-[#787878]">
            {row.vendor.name}
          </p>
        </div>
      ),
    },
    { header: "Vendor Name", accessor: "customer" },
    {
      header: "Category",
      render: (row) => `₦${row.amount?.toLocaleString()}.00`,
    },
    {
      header: "Inventory",
      render: (row) =>
        row.vendor?.assigned ? (
          <span className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {row.vendor.name}
          </span>
        ) : (
          <div className="text-[#F59E0B] flex items-center gap-[6px]">
            <Image src={dangerOrange} alt="dangericon" />{" "}
            <span>Unassigned</span>
          </div>
        ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="text-sm font-medium capitalize">
          {statusMap[row.status]}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div
          onClick={() => setViewProduct(true)}
          className="flex items-center gap-2.5 text-[14px] leading-5 font-semibold text-[#27AE60] cursor-pointer"
        >
          <Image src={eyeGreen} alt="eye-icon" />
          <p>View</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Table area */}
      <div className="flex-1">
        <Table
          columns={columns}
          data={products}
          isLoading={isLoading}
          loadingRows={10}
        />
      </div>

      {/* Footer pinned to bottom */}
      <div
        className={`flex items-center justify-between pt-4 w-full mt-4 transition-opacity ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <ItemsPerPage />
        <Pagination totalItems={90} perPage={perPage} />
      </div>

      <RightDrawer
        isOpen={openViewProduct}
        onClose={() => setViewProduct(false)}
        widthClass="w-full md:w-[640px]"
      >
        <ProductDetailsDrawer onClose={() => setViewProduct(false)} />
      </RightDrawer>
    </div>
  );
}
