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
import Link from "next/link";
import Image from "next/image";
import eye from "@/assets/svgs/eye-green.svg";
import moreIcon from "@/assets/svgs/more.svg";
import Pagination from "../general/Pagination";
import authImg from "@/assets/images/IFETO-Logo-1.png";
import RightDrawer from "../general/RightDrawer";
import { useState } from "react";
import { ProductDetailsDrawer } from "../products/ProductDetailsDrawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteCollectionDialog } from "./DeleteCollectionDialog";
import EditCollection from "./EditCollection";

type productstatus =
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
  status: productstatus;
  payout: "Eligible" | "-";
};

type CategoryTableProps = {
  products: Order[];
  isLoading: boolean;
};

export default function CollectionTable({
  products,
  isLoading,
}: CategoryTableProps) {
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage") ?? 7);
  const [openViewProduct, setViewProduct] = useState(false);
  const [openDeleteCollectionDialog, setOpenDeleteCollectionDialog] =
    useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleOpenEdit = (category: any) => {
    setSelectedCategory(category);
    setOpenEdit(true);
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDeleteCollectionDialog(true);
  };

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
    {
      header: "Collection Name",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[48px] rounded-[6px] bg-[#EFEEEE] flex items-center justify-center">
            <p className="text-[24px] leading-5 font-bold text-[#787878]">
              {row.customer.at(0)}
            </p>
          </div>
        </div>
      ),
    },
    { header: "Description", accessor: "customer" },
    {
      header: "Total Product",
      render: (row) => `₦${row.amount?.toLocaleString()}.00`,
    },

    {
      header: "Status",
      render: (row) => (
        <span className="text-sm font-medium capitalize">
          {statusMap[row.status]}
        </span>
      ),
    },
    {
      header: "Date Created",
      render: (row) => `₦${row.amount?.toLocaleString()}.00`,
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
                <Link
                  href={"catalog/add-product"}
                  className="flex gap-2 px-2 py-4 cursor-pointer w-full"
                >
                  <span>Add Product</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  onClick={() =>
                    handleOpenEdit({
                      id: "1",
                      itemName: "Fruits & Vegetables",
                      description:
                        "Fruits & Vegetables items includes cucumber, cabbage",
                      image: "/images/authImg2.jpeg", // existing image URL
                    })
                  }
                  className="flex gap-2 px-2 py-4 cursor-pointer w-full"
                >
                  <span>Edit Collection</span>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <div
                  onClick={() => handleOpenDelete(row.id)}
                  className="flex gap-2 px-2 py-4 cursor-pointer w-full text-[#EF4444]"
                >
                  <span>Deactivate Collection</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* Table area */}
      <div className="flex-1">
        <Table
          columns={columns}
          data={products}
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

      <RightDrawer
        isOpen={openViewProduct}
        onClose={() => setViewProduct(false)}
        widthClass="w-full md:w-[640px]"
      >
        <ProductDetailsDrawer onClose={() => setViewProduct(false)} />
      </RightDrawer>

      <DeleteCollectionDialog
        open={openDeleteCollectionDialog}
        onOpenChange={setOpenDeleteCollectionDialog}
        id={selectedId}
        onDelete={() => {
          console.log("Deleted!");
          setOpenDeleteCollectionDialog(false);
        }}
      />

      <RightDrawer
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        widthClass="w-full md:w-[640px]"
      >
        <EditCollection
          category={selectedCategory}
          onClose={() => setOpenEdit(false)}
        />
      </RightDrawer>
    </div>
  );
}
