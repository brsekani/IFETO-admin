"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import eyeGreen from "@/assets/svgs/eye-green.svg";
import dangerOrange from "@/assets/svgs/danger-orange.svg";

import { Order } from "@/lib/features/orders/ordersApi";
import { ItemsPerPage } from "@/components/Table/ItemsPerPage";
import Pagination from "@/components/general/Pagination";
import Table, { Column } from "@/components/Table/Table";
import moreIcon from "@/assets/svgs/more.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CountryTableProps = {
  countries: Order[];
  isLoading: boolean;
  totalItems: number;
};

export default function CountryTable({
  countries,
  isLoading,
  totalItems,
}: CountryTableProps) {
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
      header: "Country Name",
      render: (row) =>
        row.trackingNumber || `#${row.id.substring(0, 8).toUpperCase()}`,
    },
    {
      header: "Country Code",
      render: (row) => row.user?.email || row.user?.firstName || "Unknown",
    },
    {
      header: "Region",
      render: (row) => `₦${row.totalAmountPaid?.toLocaleString() || "0"}.00`,
    },
    {
      header: "Delivery Status",
      render: (row) => (
        <span className="text-sm font-medium capitalize">
          {getStatusBadge(row.status)}
        </span>
      ),
    },

    {
      header: "Date Created",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: () => <div className="text-center w-full">Actions</div>,
      render: (row) => (
        <div className="flex justify-center text-[14px] leading-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <Image src={moreIcon} alt="more" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuItem asChild>
                <div className="flex gap-2 px-2 py-4 cursor-pointer w-full">
                  <span>Disable Delivery</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  //   onClick={() => handleOpenDelete(row.id)}
                  className="flex gap-2 px-2 py-4 cursor-pointer w-full text-[#EF4444]"
                >
                  <span>Delete Country</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          data={countries}
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
