"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import MerticsCard from "../../components/dashboard/MerticsCard";
import ProductTable from "@/components/products/ProductTable";
import EmptyState from "@/components/general/EmptyState";

import purpleCube from "@/assets/svgs/purple-cube.svg";
import orangeCube from "@/assets/svgs/orange-cube.svg";
import greenTruck from "@/assets/svgs/green-truck.svg";
import bagRed from "@/assets/svgs/bag-red.svg";
import add from "@/assets/svgs/add-white.svg";
import chartPurple from "@/assets/svgs/chart-purple.svg";
import emptyIcon from "@/assets/svgs/empty-state-catalog.svg";
import bag from "@/assets/svgs/bag-purple.svg";
import search from "@/assets/svgs/search-normal-light.svg";

import Image from "next/image";
import { ChartColumnBig, Handbag } from "lucide-react";
import CategoriesPanel from "@/components/catalog/CategoriesPanel";
import CollectionPanel from "@/components/collection/CollectionPanel";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("status") || "categories";

  const setActiveFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus === "categories") {
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
  ];

  const filterOptions = [
    {
      name: "Categories",
      state: "categories",
      icon: <ChartColumnBig size={18} />,
    },
    {
      name: "Collection",
      state: "collection",
      icon: <Handbag size={18} />,
    },
  ];

  const getFilterStyle = (status: string, isActive: boolean) => {
    if (!isActive)
      return {
        container: "text-[#787878] hover:bg-gray-50",
      };

    return {
      container: "bg-[#E3FFEF] text-primary",
    };
  };

  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-[85vh] h-full flex flex-col">
      {/* Header */}
      <div className="space-y-5">
        <div>
          <h1 className="md:text-[24px] text-[16px] font-medium text-[#5A5A5A]">
            Catalog
          </h1>
          <p className="md:text-[16px] text-[14px] text-[#787878]">
            Manage categories and products for IFETO.
          </p>
        </div>

        {/* Metrics */}
        <div className="w-full grid xl:grid-cols-4 grid-cols-2 gap-4">
          <MerticsCard
            title="Total Categories"
            value={0}
            description="All categories added"
            icon={<Image src={chartPurple} alt="" className="w-5 h-5" />}
            iconBg="#2E0BF51A"
          />

          <MerticsCard
            title="Total Products"
            value={0}
            description="Products added to a category"
            icon={<Image src={bag} alt="" className="w-5 h-5" />}
            iconBg="#2E0BF51A"
          />

          <MerticsCard
            title="Products Out of Stock"
            value={0}
            description="Products that are unavailable"
            icon={<Image src={bagRed} alt="" className="w-5 h-5" />}
            iconBg="#EF44441A"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        selectedIndex={filterOptions?.findIndex(
          (option) => option.state === activeFilter,
        )}
        onSelect={(index) => {
          const selected = filterOptions[index];
          if (selected) setActiveFilter(selected.state);
        }}
      >
        <TabList className="flex gap-4 border-b border-[#EFEEEE]">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.state;
            const styles = getFilterStyle(option.state, isActive);

            return (
              <Tab
                key={option.state}
                className={`px-4 py-2 rounded-t-md font-medium cursor-pointer outline-none transition-all ${styles.container}`}
                selectedClassName="border-b-2 border-primary"
              >
                <div className="flex items-center gap-2">
                  {option.icon}
                  {option.name}
                </div>
              </Tab>
            );
          })}
        </TabList>

        {/* Categories Panel */}
        <TabPanel>
          <CategoriesPanel orders={orders} />
        </TabPanel>

        {/* Products Panel */}
        <TabPanel>
          <CollectionPanel orders={orders} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
