"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MerticsCard from "../../components/dashboard/MerticsCard";
import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import bagRed from "@/assets/svgs/bag-red.svg";
import add from "@/assets/svgs/add-green.svg";
import chartPurple from "@/assets/svgs/chart-purple.svg";
import emptyIcon from "@/assets/svgs/empty-state-catalog.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import check from "@/assets/svgs/tick-circle-green.svg";
import clock from "@/assets/svgs/clock-orange.svg";
import danger from "@/assets/svgs/danger-red.svg";
import search from "@/assets/svgs/search-normal-light.svg";
import Image from "next/image";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

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
import { ChartColumnBig, Handbag } from "lucide-react";
import CurrencyExchangeRate from "@/components/settings/CurrencyExchangeRate/CurrencyExchangeRate";
import ShippingConfiguration from "@/components/settings/ShippingConfiguration/ShippingConfiguration";
import PlatformEconomics from "@/components/settings/PlatformEconomics/PlatformEconomics";
import SystemSettings from "@/components/settings/SystemSettings/SystemSettings";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") || "currency-exchange-rate";
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

  const filterOptions = [
    {
      name: "Currency & Exchange Rate",
      state: "currency-exchange-rate",
      icon: <ChartColumnBig />,
    },
    {
      name: "Shipping Configuration",
      state: "shipping-configuration",
      icon: <Handbag />,
    },
    {
      name: "Platform Economics",
      state: "platform-economics",
      icon: <Handbag />,
    },
    {
      name: "System Settings",
      state: "system-settings",
      icon: <Handbag />,
    },
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
          <div className="space-y-2">
            <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 font-medium text-[#5A5A5A]">
              Settings
            </h1>

            <p className="md:text-[16px] text-[14px] md:leading-6 leading-5 text-[#787878]">
              Configure currencies, exchange rates, and shipping logistics for
              IFETO.
            </p>
          </div>
        </div>
      </div>

      <div className="flex md:items-center items-start md:flex-row flex-col justify-between gap-4 w-full">
        <Tabs
          selectedIndex={filterOptions.findIndex(
            (option) => option.state === activeFilter,
          )}
          onSelect={(index) => setActiveFilter(filterOptions[index].state)}
          className="w-full"
        >
          {/* TAB BUTTONS */}
          <TabList className="flex gap-4 mt-6 overflow-x-auto pb-2">
            {filterOptions.map((option) => {
              const isActive = activeFilter === option.state;
              const styles = getFilterStyle(option.state, isActive);

              return (
                <Tab
                  key={option.name}
                  className={`
              inline-flex items-center gap-2
              px-4 py-2 rounded-[6px]
              font-medium cursor-pointer
              transition-colors duration-300
              outline-none
              whitespace-nowrap
              ${styles.container}
            `}
                  selectedClassName=""
                >
                  {option.icon}
                  {option.name}
                </Tab>
              );
            })}
          </TabList>

          {/* TAB CONTENT */}
          {filterOptions.map((option) => (
            <TabPanel key={option.state} className={"w-full"}>
              <div className="mt-6 w-full">
                {option.state === "currency-exchange-rate" && (
                  <CurrencyExchangeRate />
                )}
                {option.state === "shipping-configuration" && (
                  <ShippingConfiguration />
                )}
                {option.state === "platform-economics" && <PlatformEconomics />}
                {option.state === "system-settings" && <SystemSettings />}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
