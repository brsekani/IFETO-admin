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
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { Product } from "@/lib/features/products/productsApi";

type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  totalItems?: number;
};

export default function ProductTable({
  products,
  isLoading,
  totalItems = 0,
}: ProductTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 10);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const statusMap: Record<string, React.ReactNode> = {
    PENDING: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
        Pending
      </span>
    ),
    APPROVED: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
        Approved
      </span>
    ),
    REJECTED: (
      <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
        Rejected
      </span>
    ),
  };

  const columns: Column<Product>[] = [
    {
      header: "Product Name",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-2/6 h-[40px] rounded-[6px] bg-[#EFEEEE] flex items-center justify-center overflow-hidden">
            <Image
              src={row.images?.[0]}
              alt={row.name}
              width={40}
              height={43}
              className="object-cover w-full h-full"
            />
          </div>

          <p
            className="text-[14px] leading-5 font-medium text-[#787878] w-4/6"
            title={row.name}
          >
            {row.name}
          </p>
        </div>
      ),
    },
    {
      header: "Vendor Name",
      render: (row) => row.vendorProfile?.businessName || "Unknown Vendor",
    },
    {
      header: "Category",
      render: (row) => row.category?.name || "Uncategorized",
    },
    {
      header: "Inventory",
      render: (row) => (
        <span className="flex items-center gap-2 text-gray-700">
          <span
            className={`w-2 h-2 rounded-full ${row.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
          />
          {row.quantity} in stock
        </span>
      ),
    },
    {
      header: "Status",
      render: (row) => (
        <span className="text-sm font-medium">
          {statusMap[row.approvalStatus] || (
            <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-gray-100 text-gray-600">
              {row.approvalStatus}
            </span>
          )}
        </span>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div
          onClick={() => setSelectedProduct(row)}
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
        <Pagination totalItems={totalItems} perPage={perPage} />
      </div>

      <RightDrawer
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        widthClass="w-full md:w-[640px]"
      >
        <ProductDetailsDrawer
          onClose={() => setSelectedProduct(null)}
          product={selectedProduct}
        />
      </RightDrawer>
    </div>
  );
}
