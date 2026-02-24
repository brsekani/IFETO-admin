"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import purpleCube from "@/assets/svgs/purple-cube.svg";
import wallet from "@/assets/svgs/wallet-add.svg";
import MerticsCard from "@/components/dashboard/MerticsCard";
import percentageCircle from "@/assets/svgs/percentage-circle.svg";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import status from "@/assets/svgs/status.svg";
import Image from "next/image";
import Table, { Column } from "@/components/Table/Table";
import { ChevronDown, Link, MapPin } from "lucide-react";
import { getTrackingSteps } from "@/utils/utils";
import emptyIcon from "@/assets/svgs/empty-state-vendor.svg";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { useState } from "react";
import { AssignVendorModal } from "@/components/orders/AssignVendorModal";
import { UpdateOrderTrackingModal } from "@/components/orders/UpdateOrderTrackingModal";
import { SuccessModal } from "@/components/orders/SuccessModal";
import tickCircleGreen from "@/assets/svgs/tick-circle-green.svg";
import { FileItem } from "@/components/vendor-management/FileItem";
import { SingleImagePreviewDrawer } from "@/components/vendor-management/SingleImagePreviewDrawer";
import search from "@/assets/svgs/search-normal-light.svg";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { DatePickerWithRange } from "@/components/general/DatePickerWithRange";
import OrdersTable from "@/components/dashboard/OrdersTable";
import EmptyState from "@/components/general/EmptyState";

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

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openUpdateOrderTrackingModal, setUpdateOrderTrackingModal] =
    useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    status: searchParams.get("status") ?? "all",
    category: searchParams.get("category") ?? "all",
    sortBy: searchParams.get("sort") ?? "recent",
    search: searchParams.get("q") ?? "",
  });

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
            Vendor Details
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-[#27AE60] flex items-center gap-2.5 px-5 py-2.5 text-white rounded-[6px] text-[18px] leading-7 font-semibold">
              <span>Actions</span>
              <ChevronDown size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
          w-[220px]
          rounded-[12px]
          bg-[#F5F5F5]
          shadow-custom2
          border-none
          p-2
        "
          >
            <DropdownMenuItem
              className="
            text-[15px]
            text-[#4F4F4F]
            font-medium
            rounded-[8px]
            px-4
            py-3
            cursor-pointer
            focus:bg-[#EAEAEA]
          "
              onClick={() => setOpenAssignModal(true)}
            >
              Approve
            </DropdownMenuItem>

            <DropdownMenuItem
              className="
            text-[15px]
            text-[#4F4F4F]
            font-medium
            rounded-[8px]
            px-4
            py-3
            cursor-pointer
            focus:bg-[#EAEAEA]
          "
              onClick={() => setUpdateOrderTrackingModal(true)}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito space-y-6">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Halimah Enterprise
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="space-y-2">
            <p className="text-[#787878] text-[14px] leading-5">Status</p>
            <span className="px-4 py-1 text-sm rounded-full bg-[#F59E0B1A] text-[#F59E0B] font-medium">
              Pending
            </span>
          </div>
          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">
              Business Type
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              Gabriel Isaac
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Name</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              Chukwuemeka Okafor
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">
              Email Address
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              Gabriel.isaac@example.cotm
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Phone Number</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              +234 704 218 2953
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Address Line</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              12 Brookview lane, flat 3B, brixson, london SW2 5RT, United
              Kingdom
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito space-y-6">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Other Details
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Account Name</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              First Bank
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">
              Account Number
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              2012345678
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Name</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              Chukwuemeka Okafor
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Documents</p>
            <FileItem
              fileName="National_ID_Card"
              fileSize="2.4MB"
              uploadedAt="2024-05-16 09:40:30"
              onView={() => setOpen(true)}
            />
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Phone Number</p>
            <FileItem
              fileName="National_ID_Card"
              fileSize="2.4MB"
              uploadedAt="2024-05-16 09:40:30"
              onView={() => setOpen(true)}
            />
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Address Line</p>
            <FileItem
              fileName="National_ID_Card"
              fileSize="2.4MB"
              uploadedAt="2024-05-16 09:40:30"
              onView={() => setOpen(true)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        <MerticsCard
          title="Total Sales"
          value={"₦200,000.00"}
          description="In your local currency"
          icon={<Image src={wallet} alt="" className="w-4 h-4 md:w-6 md:h-6" />}
          iconBg={"#2E0BF51A"}
        />

        <MerticsCard
          title="Completed Orders"
          value={30}
          description="All orders delivered"
          icon={
            <Image src={purpleCube} alt="" className="w-4 h-4 md:w-6 md:h-6" />
          }
          iconBg={"#2E0BF51A"}
        />

        <MerticsCard
          title="Fulfillment rate"
          value={"95%"}
          description="Successful delivery rate"
          icon={
            <Image
              src={percentageCircle}
              alt=""
              className="w-4 h-4 md:w-6 md:h-6"
            />
          }
          iconBg={"#27AE601A"}
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
              title="No orders yet"
              description="You haven’t received any orders from customers. All orders placed will appear here"
            />
          </div>
        ) : (
          <div className="w-full">
            <OrdersTable orders={orders} isLoading={false} />
          </div>
        )}
      </div>

      <SingleImagePreviewDrawer
        title="National ID Card"
        imageUrl="https://ifeto-waix.vercel.app/_next/image?url=https%3A%2F%2Fpicsum.photos%2Fseed%2F56024%2F800%2F600&w=750&q=75"
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <SuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Success"
        message="This order has been successfully updated"
        icon={tickCircleGreen}
      />
    </div>
  );
}
