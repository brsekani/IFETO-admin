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
import Pagination from "./Pagination";
import Link from "next/link";
import Image from "next/image";
import eyeGreen from "@/assets/svgs/eye-green.svg";
import dangerOrange from "@/assets/svgs/danger-orange.svg";

type OrderStatus =
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
  status: OrderStatus;
  payout: "Eligible" | "-";
};

type OrdersTableProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function OrdersTable({ orders, isLoading }: OrdersTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);

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
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    {
      header: "Amount",
      render: (row) => `₦${row.amount?.toLocaleString()}.00`,
    },
    {
      header: "Assigned Vendor",
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
    { header: "Payout", accessor: "payout" },
    {
      header: "Actions",
      render: (row) => (
        <Link
          href={`/orders/${row.name}`}
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
        <Pagination totalItems={90} perPage={perPage} />
      </div>
    </div>
  );
}
