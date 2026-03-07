"use client";

import Image from "next/image";
import React from "react";
import EmptyState from "../general/EmptyState";
// import CategoryTable from "./CategoryTable";

import add from "@/assets/svgs/add-white.svg";
import emptyIcon from "@/assets/svgs/empty-state-catalog.svg";
import search from "@/assets/svgs/search-normal-light.svg";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import RightDrawer from "../general/RightDrawer";
import CollectionTable from "./CollectionTable";
import CreateCollection from "./CreateCollection";

export default function CollectionPanel({ orders }: any) {
  // please change the any in api intergeration
  const searchParams = useSearchParams();
  const router = useRouter();
  const [openCreateCollection, setCreateCollection] = useState(false);

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

  return (
    <div>
      {" "}
      <div className="mt-6 flex justify-between items-center gap-4">
        <div className="relative w-full max-w-[528px]">
          <input
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="w-full text-sm bg-white h-10 rounded-xl px-10 border border-[#EFEEEE] focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60] outline-none"
            placeholder="Search by Categories"
          />
          <Image
            className="absolute top-3 left-3 w-4 h-4"
            src={search}
            alt="search"
          />
        </div>

        <div
          className="px-5 py-2.5 bg-[#27AE60] rounded-md text-white font-semibold hidden md:flex items-center gap-2 cursor-pointer"
          onClick={() => setCreateCollection(true)}
        >
          <Image src={add} alt="add-icon" />
          Create Collection
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center w-full">
        {orders.length === 0 ? (
          <EmptyState
            icon={emptyIcon}
            title="No catalog yet"
            description="You haven’t created any collections."
          />
        ) : (
          <CollectionTable products={orders} isLoading={false} />
        )}
      </div>
      <RightDrawer
        isOpen={openCreateCollection}
        onClose={() => setCreateCollection(false)}
        widthClass="w-full md:w-[640px]"
      >
        <CreateCollection onClose={() => setCreateCollection(false)} />
      </RightDrawer>
    </div>
  );
}
