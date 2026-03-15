"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import MerticsCard from "@/components/dashboard/MerticsCard";
import Image from "next/image";
import Table, { Column } from "@/components/Table/Table";
import { ChevronDown, Link, MapPin } from "lucide-react";
import { getTrackingSteps } from "@/utils/utils";
import OrderTrackingSteps from "@/components/general/OrderTrackingSteps";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { useEffect, useState } from "react";
import { AssignVendorModal } from "@/components/orders/AssignVendorModal";
import { UpdateOrderTrackingModal } from "@/components/orders/UpdateOrderTrackingModal";
import { SuccessModal } from "@/components/orders/SuccessModal";
import tickCircleGreen from "@/assets/svgs/tick-circle-green.svg";
import add from "@/assets/svgs/add-white.svg";
import globalPurple from "@/assets/svgs/global-purple.svg";
import globalgreen from "@/assets/svgs/global-green.svg";
import globalred from "@/assets/svgs/global-red.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import search from "@/assets/svgs/search-normal-light.svg";
import EmptyState from "@/components/general/EmptyState";
import emptyIcon from "@/assets/svgs/empty-State-country.svg";
import OrdersTable from "@/components/dashboard/OrdersTable";
import CountryTable from "@/components/settings/ManangeCountry/CountryTable";
import { CreateCountryDialog } from "@/components/settings/ManangeCountry/CreateCountryDialog";

type Order = {
  id: string; // Order ID
  orderNumber: string; // e.g. ORD-10234
  date: string; // ISO date
  itemsCount: number; // number of items
  totalWeight: string; // e.g. "3.2kg"
  totalAmount: number; // ₦
  status: string;
  earnings: number;
};

type OrderTableProps = {
  orders: Order[];
  isLoading: boolean;
};

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") ?? "all",
    category: searchParams.get("category") ?? "all",
    sortBy: searchParams.get("sort") ?? "recent",
    search: searchParams.get("q") ?? "",
  });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);
    if (filters.search) params.set("q", filters.search);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  const orders = [
    {
      id: "1",
      orderNumber: "ORD-1001",
      date: "2025-12-23",
      itemsCount: 3,
      totalWeight: "900g",
      totalAmount: 4200,
      earnings: 3800,
      status: "pending",
    },
    {
      id: "2",
      orderNumber: "ORD-1002",
      date: "2025-12-23",
      itemsCount: 1,
      totalWeight: "300g",
      totalAmount: 4200,
      earnings: 3500,
      status: "cancelled",
    },
    {
      id: "3",
      orderNumber: "ORD-1003",
      date: "2025-12-23",
      itemsCount: 2,
      totalWeight: "600g",
      totalAmount: 8400,
      earnings: 7600,
      status: "delivered",
    },
  ];

  const columns: Column<Order>[] = [
    {
      header: "Item",
      render: (row) => (
        <p className="line-clamp-1 text-[14px] leading-5 font-semibold text-[#5A5A5A]">
          {row.id}
        </p>
      ),
    },
    {
      header: "Quantity",
      render: (row) => <p className="line-clamp-2">{row.date}</p>,
    },
    { header: "Weight (Each)", accessor: "itemsCount" },
    {
      header: "Total Weight",
      render: (row) => (
        <p className="font-semibold text-[#2A2A2A]">{row.totalWeight}</p>
      ),
    },
  ];

  const order = {
    status: "DELIVERED",
    createdAt: "2026-02-01T10:15:00Z",
    processedAt: "2026-02-02T09:30:00Z",
    shippedAt: "2026-02-03T14:45:00Z",
    deliveredAt: "2026-02-04T18:20:00Z",
  };

  // const trackingSteps = getTrackingSteps({});
  const trackingSteps = getTrackingSteps(order || {});

  const orderItems = [
    {
      id: "1",
      name: "Yellow Garri",
      description: "1Qty: 1 Half Paint Bucket (1kg Bucket )",
      price: 41200,
      image: authImg,
    },
    {
      id: "2",
      name: "Fresh Cabbage",
      description: "2Qty: Quarter Bag (12.5kg )",
      price: 41200,
      image: authImg,
    },
    {
      id: "3",
      name: "Yellow Garri",
      description: "1Qty: 1 Half Paint Bucket (1kg Bucket )",
      price: 41200,
      image: authImg,
    },
  ];

  const [openCreateCountry, setOpenCreateCountry] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      <div className="flex flex-row gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image src={arrowLeft} alt="arrow-back" />
            <p className="text-[16px] leading-6 font-semibold text-[#787878]">
              back
            </p>
          </div>

          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
            Manage Countries
          </h1>
        </div>
        <div
          className="px-5 py-2.5 bg-[#27AE60] rounded-md text-white font-semibold hidden md:flex items-center gap-2 cursor-pointer"
          onClick={() => setOpenCreateCountry(true)}
        >
          <Image src={add} alt="add-icon" />
          Add Country
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
        <MerticsCard
          title="Total Countries"
          value={0}
          description="Countries eligible for delivery"
          icon={<Image src={globalPurple} alt="" className="w-6 h-6" />}
          iconBg="#2E0BF51A"
        />

        <MerticsCard
          title="Enabled Countries"
          value={0}
          description="Countries enabled for delivery"
          icon={<Image src={globalgreen} alt="" className="w-6 h-6" />}
          iconBg="#27AE601A"
        />

        <MerticsCard
          title="Disabled Coountries"
          value={0}
          description="Countries enabled for delivery"
          icon={<Image src={globalred} alt="" className="w-6 h-6" />}
          iconBg="#EF44441A"
        />
      </div>

      <div className="flex md:items-center items-start md:flex-row flex-col justify-between gap-4">
        <form className="w-full lg:max-w-[450px] xl:max-w-[528px] flex items-center">
          <div className="relative w-full">
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full text-sm bg-white h-10 rounded-xl px-10 border-[0.6px] border-[#EFEEEE] focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60] transition-all outline-none"
              placeholder="Search by country name, country code or region"
              maxLength={50}
            />

            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="absolute top-3 right-3 text-gray-400 text-sm hover:text-gray-600"
              >
                ✕
              </button>
            )}

            <Image
              className="absolute top-3 left-3 w-4 h-4 pointer-events-none"
              src={search}
              alt="search"
            />
          </div>
        </form>

        <div className="overflow-x-auto w-full">
          <div className="flex items-center md:justify-end justify-start gap-3 min-w-100 w-full">
            <Select
              value={filters.sortBy}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="py-3 px-4 text-[16px] font-semibold">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recent">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="name-asc">Name (A–Z)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 flex w-full">
        {orders.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No country yet"
              description="You haven’t added any country."
            />
          </div>
        ) : (
          <div className="w-full">
            <CountryTable
              countries={orders}
              isLoading={false}
              totalItems={orders.length}
            />
          </div>
        )}
      </div>

      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Success"
        message="This order has been successfully updated"
        icon={tickCircleGreen}
      />

      <CreateCountryDialog
        open={openCreateCountry}
        onOpenChange={setOpenCreateCountry}
        onCreate={() => {
          console.log("Deleted!");
          setOpenCreateCountry(false);
        }}
      />
    </div>
  );
}
