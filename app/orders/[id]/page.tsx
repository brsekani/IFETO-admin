"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Formik, Form, Field, ErrorMessage } from "formik";

import arrowLeft from "@/assets/svgs/arrow-left.svg";
import status from "@/assets/svgs/status.svg";
import Image from "next/image";
import { AddProductSchema } from "@/utils/schema";
import Table, { Column } from "@/components/Table/Table";
import { ChevronDown, Link, MapPin } from "lucide-react";
import { getTrackingSteps } from "@/utils/utils";
import OrderTrackingSteps from "@/components/general/OrderTrackingSteps";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { useState } from "react";
import { AssignVendorModal } from "@/components/orders/AssignVendorModal";
import { UpdateOrderTrackingModal } from "@/components/orders/UpdateOrderTrackingModal";

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

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openUpdateOrderTrackingModal, setUpdateOrderTrackingModal] =
    useState(false);

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
            Order Details
          </h1>

          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            #1024
          </p>
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
              Assign Vendor
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
              Update Order Tracking
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito">
        <div className="flex items-center gap-2 flex-row mb-4 md:mb-6">
          <Image src={status} alt="" />
          <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
            Order Tracking
          </h2>
        </div>
        <OrderTrackingSteps steps={trackingSteps} />
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito space-y-6">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Customer Information
        </h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Name</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              Gabriel Isaac
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Phone Number</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              +44 7480 112345
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
            <p className="text-[14px] leading-5 text-[#787878]">
              Delivery Address
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              12 Brookview lane, flat 3B, brixson, london SW2 5RT, United
              Kingdom
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.08)] space-y-6">
        <h3 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Order Items
        </h3>

        {orderItems.map((item) => (
          <div
            key={item.id}
            className="border-b border-[#E0E0E0] pb-4 mb-4 last:border-none last:mb-0 last:pb-0"
          >
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[48px] rounded-[6px] bg-[#EFEEEE] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={51}
                    height={43}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h6 className="text-[16px] leading-6 font-medium text-[#363636]">
                    {item.name}
                  </h6>
                  <p className="text-[14px] leading-5 font-medium text-[#787878]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Side (Price) */}
              <p className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
                ₦{item.price.toLocaleString()}.00
              </p>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-[20px] leading-7.5 font-bold text-[#363636]">
            Total Amount
          </p>
          <p className="text-[20px] leading-7.5 font-bold text-[#363636]">
            ₦123,600.00
          </p>
        </div>
      </div>

      <AssignVendorModal open={openAssignModal} setOpen={setOpenAssignModal} />
      <UpdateOrderTrackingModal
        open={openUpdateOrderTrackingModal}
        setOpen={setUpdateOrderTrackingModal}
      />
    </div>
  );
}
