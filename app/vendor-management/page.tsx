"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import add from "@/assets/svgs/add-green.svg";
import emptyIcon from "@/assets/svgs/empty-state-vendor.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
import profileUserRed from "@/assets/svgs/profile-2user-red.svg";
import profileUserGreen from "@/assets/svgs/profile-2user-green.svg";
import profileUserPurple from "@/assets/svgs/profile-2user-purple.svg";
import profileUserOrange from "@/assets/svgs/profile-2user-orange.svg";
import Image from "next/image";

import "swiper/css";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import EmptyState from "@/components/general/EmptyState";
import OrdersTable from "@/components/dashboard/OrdersTable";
import { DatePickerWithRange } from "@/components/general/DatePickerWithRange";
import VendorManagementTable from "@/components/vendor-management/VendorManagementTable";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") || "All orders";
  const isLoading = false;

  const setActiveFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === "All orders") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

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
      id: "#1024",
      customer: "Gabriel Isaac",
      amount: 41200,
      vendor: { name: "Halimah Enterprise", assigned: true },
      status: "shipped",
      payout: "-",
    },
    {
      id: "#1025",
      customer: "Gabriel Isaac",
      amount: 4200,
      vendor: { name: "", assigned: false },
      status: "placed",
      payout: "-",
    },
    {
      id: "#1026",
      customer: "Gabriel Isaac",
      amount: 4200,
      vendor: { name: "Isaac Farms", assigned: true },
      status: "processing",
      payout: "-",
    },
    {
      id: "#1027",
      customer: "Gabriel Isaac",
      amount: 4200,
      vendor: { name: "Gospel Venture", assigned: true },
      status: "completed",
      payout: "Eligible",
    },
    {
      id: "#1028",
      customer: "Gabriel Isaac",
      amount: 4200,
      vendor: { name: "", assigned: false },
      status: "placed",
      payout: "-",
    },
    {
      id: "#1029",
      customer: "Gabriel Isaac",
      amount: 4200,
      vendor: { name: "Isaac Farms", assigned: true },
      status: "completed",
      payout: "Eligible",
    },
  ];

  const filterOptions = [
    "All orders",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-light hover:bg-gray-50",
        count: "text-light bg-[#EFEEEE]",
      };

    switch (status.toLowerCase()) {
      case "processing":
      case "pending":
        return {
          container: "bg-[#FFF8E6] text-[#F2C94C]",
          count: "bg-[#F2C94C] text-white",
        };
      case "shipped":
        return {
          container: "bg-[#E6F7FF] text-[#2F80ED]",
          count: "bg-[#2F80ED] text-white",
        };
      case "cancelled":
        return {
          container: "bg-[#FFEEEE] text-[#EB5757]",
          count: "bg-[#EB5757] text-white",
        };
      case "delivered":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
        };
      case "all orders":
      default:
        return {
          container: "bg-[#E3FFEF] text-primary",
          count: "bg-primary text-white",
        };
    }
  };

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-[85vh] h-full flex flex-col">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="md:space-y-2 space-y-3">
            <h1 className="md:text-[32px] text-[16px] md:leading-8 leading-6 font-medium text-[#2A2A2A]">
              Vendor Management
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              Review and manage vendor applications and accounts.
            </p>
          </div>

          <div className="px-5 py-2.5 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold hidden md:flex items-center gap-2.5 cursor-pointer">
            <Image src={add} alt="add-icon" />
            Export to CSV
          </div>
        </div>

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Vendors"
            value={0}
            description="All vendors in the system"
            icon={
              <Image
                src={profileUserPurple}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#2E0BF51A"}
          />
          <MerticsCard
            title="Active Vendors"
            value={0}
            description="Transacting vendors"
            icon={
              <Image
                src={profileUserGreen}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E3FFEF"}
          />
          <MerticsCard
            title="Pending Vendors"
            value={0}
            description="Awaiting admin approval"
            icon={
              <Image
                src={profileUserOrange}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#F59E0B1A"}
          />
          <MerticsCard
            title="Suspended Vendors"
            value={0}
            description="All vendors suspended"
            icon={
              <Image
                src={profileUserRed}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E53E3E1A"}
          />
        </div>
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
              placeholder="Search by vendor name, email"
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
            <DatePickerWithRange />

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
              title="No vendor yet"
              description="Vendors that registered will show up here"
            />
          </div>
        ) : (
          <div className="w-full">
            <VendorManagementTable orders={orders} isLoading={false} />
          </div>
        )}
      </div>
    </div>
  );
}
