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
import Pagination from "../general/Pagination";
import Link from "next/link";
import Image from "next/image";
import eyeGreen from "@/assets/svgs/eye-green.svg";
import dangerOrange from "@/assets/svgs/danger-orange.svg";

import { Order } from "@/lib/features/orders/ordersApi";

type OrdersTableProps = {
  orders: Order[];
  isLoading: boolean;
  totalItems: number;
};

export default function OrdersTable({
  orders,
  isLoading,
  totalItems,
}: OrdersTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 10);

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
      case "PROCESSING":
        return (
          <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#F59E0B1A] text-[#F59E0B]">
            {status}
          </span>
        );
      case "SHIPPED":
        return (
          <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#2E0BF51A] text-[#2E0BF5]">
            {status}
          </span>
        );
      case "SUCCESS":
      case "COMPLETED":
      case "PAID":
        return (
          <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#34C7591A] text-[#34C759]">
            {status}
          </span>
        );
      case "CANCELLED":
      case "FAILED":
        return (
          <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-[#E53E3E1A] text-[#E53E3E]">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-4 py-1 text-[14px] font-medium capitalize rounded-full bg-gray-100 text-gray-700">
            {status || "Unknown"}
          </span>
        );
    }
  };

  const columns: Column<Order>[] = [
    {
      header: "Order Ref",
      render: (row) =>
        row.trackingNumber || `#${row.id.substring(0, 8).toUpperCase()}`,
    },
    {
      header: "Customer Email",
      render: (row) => row.user?.email || row.user?.firstName || "Unknown",
    },
    {
      header: "Amount",
      render: (row) => `₦${row.totalAmountPaid?.toLocaleString() || "0"}.00`,
    },
    {
      header: "Status",
      render: (row) => (
        <span className="text-sm font-medium capitalize">
          {getStatusBadge(row.status)}
        </span>
      ),
    },
    {
      header: "Payment",
      render: (row) => (
        <span className="text-sm font-medium capitalize">
          {row.paymentStatus?.toLowerCase()}
        </span>
      ),
    },
    {
      header: "Date",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      render: (row) => (
        <Link
          href={`/orders/${row.id}`}
          className="flex items-center gap-2.5 text-[14px] leading-5 font-semibold text-[#27AE60] cursor-pointer"
        >
          <Image src={eyeGreen} alt="eye-icon" />
          <p>View</p>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Table area */}
      <div className="flex-1">
        <Table
          columns={columns}
          data={orders}
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
    </div>
  );
}
