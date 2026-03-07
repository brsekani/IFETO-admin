"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import walletAdd from "@/assets/svgs/wallet-add.svg";
import add from "@/assets/svgs/add-green.svg";
import settings from "@/assets/svgs/settings.svg";
import emptyIcon from "@/assets/svgs/empty-state.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { GlobalMarkupModal } from "@/components/products/GlobalMarkupModal";

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
import ProductTable from "@/components/products/ProductTable";
import {
  useGetAdminProductsQuery,
  useGetAdminProductStatsQuery,
} from "@/lib/features/products/productsApi";

export default function Products() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [showMarkupModal, setShowMarkupModal] = useState(false);

  const currentStatus = searchParams.get("status") ?? "all";
  const currentCategory = searchParams.get("category") ?? "all";
  const currentSortBy = searchParams.get("sort") ?? "recent";
  const currentSearch = searchParams.get("q") ?? "";

  const activeFilter = currentStatus === "all" ? "All product" : currentStatus;

  const setActiveFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = newStatus === "All product" ? "all" : newStatus;
    if (val === "all") {
      params.delete("status");
    } else {
      params.set("status", val);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "recent") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentPage = Number(searchParams.get("page") ?? 1);
  const itemsPerPage = Number(searchParams.get("perPage") ?? 10);

  const mapApprovalStatus = (uiFilter: string) => {
    switch (uiFilter.toLowerCase()) {
      case "draft":
        return "DRAFT";
      case "pending":
        return "PENDING";
      case "approved":
        return "APPROVED";
      case "rejected":
        return "REJECTED";
      default:
        return undefined;
    }
  };

  const { data: productsResponse, isFetching: isProductsLoading } =
    useGetAdminProductsQuery({
      page: currentPage,
      limit: itemsPerPage,
      search:
        currentSearch !== "all" && currentSearch ? currentSearch : undefined,
      approvalStatus: mapApprovalStatus(currentStatus),
    });

  const { data: statsResponse, isFetching: isStatsLoading } =
    useGetAdminProductStatsQuery({});

  const stats = statsResponse?.data || {
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    draft: 0,
  };

  const products = productsResponse?.data?.products || [];
  const totalItems = productsResponse?.data?.meta?.total || 0;

  const filterOptions = [
    "All product",
    "Draft",
    "Pending",
    "Approved",
    "Rejected",
  ];

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-light hover:bg-gray-50",
        count: "text-light bg-[#EFEEEE]",
      };

    switch (status.toLowerCase()) {
      case "draft":
        return {
          container: "bg-[#F3E8FF] text-[#9333EA]",
          count: "bg-[#9333EA] text-white",
        };
      case "pending":
        return {
          container: "bg-[#FFF8E6] text-[#F2C94C]",
          count: "bg-[#F2C94C] text-white",
        };
      case "approved":
        return {
          container: "bg-[#E3FFEF] text-[#27AE60]",
          count: "bg-[#27AE60] text-white",
        };
      case "rejected":
        return {
          container: "bg-[#FFEEEE] text-[#EB5757]",
          count: "bg-[#EB5757] text-white",
        };
      case "all product":
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
          <div className="space-y-2">
            <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-medium text-[#5A5A5A]">
              Products
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5 text-[#787878]">
              Review, approve, and manage product listings from vendors.
            </p>
          </div>

          <div
            onClick={() => setShowMarkupModal(true)}
            className="px-5 py-2.5 bg-[#27AE60] rounded-[6px] text-[18px] leading-8 text-[#FFFFFF] font-semibold hidden md:flex items-center gap-2.5 cursor-pointer hover:bg-[#219150] transition"
          >
            <Image src={settings} alt="settings-icon" />
            Global Markup
          </div>
        </div>

        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Product"
            value={stats.total}
            description="All products listing"
            icon={<Image src={bag} alt="" className="w-4 h-4 md:w-6 md:h-6" />}
            iconBg={"#2E0BF51A"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Approved"
            value={stats.approved}
            description="Live & visible to customers"
            icon={
              <Image src={check} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E3FFEF"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Pending"
            value={stats.pending}
            description="Awaiting approval"
            icon={
              <Image src={clock} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#F59E0B1A"}
            isLoading={isStatsLoading}
          />
          <MerticsCard
            title="Rejected"
            value={stats.rejected}
            description="Standard not met"
            icon={
              <Image src={danger} alt="" className="w-4 h-4 md:w-6 md:h-6" />
            }
            iconBg={"#E53E3E1A"}
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
                    {(() => {
                      if (isStatsLoading) return "...";
                      switch (option.toLowerCase()) {
                        case "all product":
                          return stats.total;
                        case "draft":
                          return stats.draft;
                        case "pending":
                          return stats.pending;
                        case "approved":
                          return stats.approved;
                        case "rejected":
                          return stats.rejected;
                        default:
                          return 0;
                      }
                    })()}
                  </span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="overflow-x-auto w-full">
          <div className="flex items-center md:justify-end justify-start gap-3 min-w-100 w-full">
            <DatePickerWithRange />

            <Select value={currentSortBy} onValueChange={handleSortChange}>
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
        {isProductsLoading && products.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-[#787878] min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={emptyIcon}
              title="No product yet"
              description="You haven’t received any products listing from vendors. All product listing will appear here"
            />
          </div>
        ) : (
          <div className="w-full">
            <ProductTable
              products={products}
              isLoading={isProductsLoading}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>

      {showMarkupModal && (
        <GlobalMarkupModal onClose={() => setShowMarkupModal(false)} />
      )}
    </div>
  );
}
