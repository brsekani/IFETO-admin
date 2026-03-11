"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import add from "@/assets/svgs/add-green.svg";
import emptyIcon from "@/assets/svgs/empty-state.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
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
import {
  useGetAdminOrdersQuery,
  useGetAdminOrderStatsQuery,
} from "@/lib/features/orders/ordersApi";

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

  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("perPage") ?? 10);

  const { data: ordersResponse, isFetching: isOrdersLoading } =
    useGetAdminOrdersQuery({
      page: currentPage,
      limit: itemsPerPage,
      status: filters.status !== "all" ? filters.status : undefined,
    });

  const orders = ordersResponse?.data?.orders || [];
  const totalItems = ordersResponse?.data?.meta?.total || 0;

  const { data: statsResponse, isLoading: isStatsLoading } =
    useGetAdminOrderStatsQuery();
  const stats = statsResponse?.data;

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
              Orders
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5">
              View and manage orders containing your products.
            </p>
          </div>

          <div className="px-5 py-2.5 border border-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#27AE60] font-semibold hidden md:flex items-center gap-2.5 cursor-pointer">
            <Image src={add} alt="add-icon" />
            Export to CSV
          </div>
        </div>

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Orders"
            value={stats?.total ?? 0}
            description="All orders you’ve had"
            icon={
              <Image
                src={purpleCube}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#2E0BF51A"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Processing Orders"
            value={stats?.processing ?? 0}
            description="Currently processing"
            icon={
              <Image
                src={greenTruck}
                alt=""
                className="w-4 h-4 md:w-6 md:h-6"
              />
            }
            iconBg={"#E3FFEF"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Delivered Orders"
            value={stats?.delivered ?? 0}
            description="Successfully delivered"
            icon={
              <Image src={walletAdd} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#9333EA1A"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Pending Orders"
            value={stats?.pending ?? 0}
            description="Action required"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#F59E0B1A"}
            isLoading={isStatsLoading}
          />
        </div>
      </div>

      <div className="flex md:items-center items-start md:flex-row flex-col justify-between gap-4">
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          freeMode
          className="mt-6 pb-2 w-full"
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option;
            const styles = getFilterStyle(option, isActive);

            return (
              <SwiperSlide key={option} className="!w-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  className={`
            inline-flex items-center gap-2
            px-4 py-2 rounded-[6px]
            font-medium cursor-pointer
            transition-colors duration-300
            ${styles.container}
          `}
                >
                  {option}
                  <span
                    className={`px-2 py-0.5 rounded-xl text-xs ${styles.count}`}
                  >
                    {isOrdersLoading ? "..." : isActive ? totalItems : "-"}
                  </span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

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
        {isOrdersLoading && orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-[#787878] min-h-[300px]">
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No orders yet"
              description="You haven’t received any orders from customers. All orders placed will appear here"
            />
          </div>
        ) : (
          <div className="w-full">
            <OrdersTable
              orders={orders}
              isLoading={isOrdersLoading}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
