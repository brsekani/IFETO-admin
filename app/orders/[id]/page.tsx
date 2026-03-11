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
import Table, { Column } from "@/components/Table/Table";
import { ChevronDown, Link, MapPin } from "lucide-react";
import { getTrackingSteps } from "@/utils/utils";
import OrderTrackingSteps from "@/components/general/OrderTrackingSteps";

import authImg from "@/assets/images/IFETO-Logo-1.png";
import { useState } from "react";
import { AssignVendorModal } from "@/components/orders/AssignVendorModal";
import { UpdateOrderTrackingModal } from "@/components/orders/UpdateOrderTrackingModal";
import { SuccessModal } from "@/components/orders/SuccessModal";
import tickCircleGreen from "@/assets/svgs/tick-circle-green.svg";

import { useParams, useRouter } from "next/navigation";
import { useGetAdminOrderQuery } from "@/lib/features/orders/ordersApi";

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: response, isLoading } = useGetAdminOrderQuery(id);

  const order = response?.data;

  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openUpdateOrderTrackingModal, setUpdateOrderTrackingModal] =
    useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const trackingSteps = getTrackingSteps(order || {});

  if (isLoading) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-[#FAFAFA] min-h-screen flex items-center justify-center">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] space-y-6 min-h-screen h-full flex flex-col">
      <div className="flex flex-row gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 items-center justify-between">
        <div className="flex flex-col gap-2">
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <Image src={arrowLeft} alt="arrow-back" />
            <p className="text-[16px] leading-6 font-semibold text-[#787878]">
              back
            </p>
          </button>

          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
            Order Details
          </h1>

          <p className="text-[16px] leading-6 font-semibold text-[#787878]">
            #{order.trackingNumber || order.id.substring(0, 8).toUpperCase()}
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
              {order.assignments && order.assignments.length > 0
                ? "Reassign Vendor"
                : "Assign Vendor"}
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
              {order.user?.firstName || "Unknown"} {order.user?.lastName || ""}
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">Phone Number</p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              {order.deliveryAddress?.phone || "N/A"}
            </h1>
          </div>

          <div className="w-full space-y-2">
            <p className="text-[14px] leading-5 text-[#787878]">
              Email Address
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              {order.user?.email || "N/A"}
            </h1>
          </div>

          <div className="w-full space-y-2 lg:col-span-3">
            <p className="text-[14px] leading-5 text-[#787878]">
              Delivery Address
            </p>
            <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
              {order.deliveryAddress
                ? `${order.deliveryAddress.address1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.country}`
                : "No delivery address provided"}
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FFFFFF] rounded-[16px] p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.08)] space-y-6">
        <h3 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Order Items
        </h3>

        {order.items?.map((item: any) => (
          <div
            key={item.id}
            className="border-b border-[#E0E0E0] pb-4 mb-4 last:border-none last:mb-0 last:pb-0"
          >
            <div className="flex items-center justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <div className="w-[52px] h-[48px] rounded-[6px] bg-[#EFEEEE] flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.product?.images?.[0] || authImg}
                    alt={item.product?.name || "Product"}
                    width={51}
                    height={43}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div>
                  <h6 className="text-[16px] leading-6 font-medium text-[#363636]">
                    {item.product?.name}
                  </h6>
                  <p className="text-[14px] leading-5 font-medium text-[#787878]">
                    {item.quantity}Qty: Weight ({item.weightAtTime}kg)
                  </p>
                </div>
              </div>

              {/* Right Side (Price) */}
              <p className="text-[18px] leading-7 font-semibold text-[#2A2A2A]">
                {order.currencySymbol || "₦"}
                {(item.priceAtTime * item.quantity).toLocaleString()}.00
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-4">
          <p className="text-[16px] leading-7.5 font-medium text-[#363636]">
            Delivery Fee
          </p>
          <p className="text-[16px] leading-7.5 font-medium text-[#363636]">
            {order.currencySymbol || "₦"}
            {order.deliveryFee?.toLocaleString() || "0"}.00
          </p>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-[20px] leading-7.5 font-bold text-[#363636]">
            Total Amount (Paid)
          </p>
          <p className="text-[20px] leading-7.5 font-bold text-[#363636]">
            {order.currencySymbol || "₦"}
            {order.totalAmountPaid?.toLocaleString()}.00
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:p-6 p-4 shadow-custom2 font-nunito space-y-6">
        <h2 className="text-[18px] leading-7 md:text-[24px] md:leading-8 text-[#2A2A2A] font-semibold ">
          Assignment
        </h2>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {order.assignments && order.assignments.length > 0 ? (
            order.assignments.map((assignment: any, index: number) => (
              <div key={index} className="contents">
                <div className="w-full space-y-2">
                  <p className="text-[14px] leading-5 text-[#787878]">
                    Assigned To
                  </p>
                  <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
                    {assignment.vendorProfile?.businessName ||
                      assignment.vendorId ||
                      "Vendor"}
                  </h1>
                </div>

                <div className="w-full space-y-2">
                  <p className="text-[14px] leading-5 text-[#787878]">Status</p>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${
                      assignment.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : assignment.status === "ACCEPTED" ||
                            assignment.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : assignment.status === "REJECTED" ||
                              assignment.status === "CANCELLED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {assignment.status?.toLowerCase() || "pending"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full col-span-2 space-y-2">
              <p className="text-[14px] leading-5 text-[#787878]">
                Assigned To
              </p>
              <h1 className="text-[16px] leading-6 text-[#2A2A2A] font-semibold">
                No vendor assigned yet.
              </h1>
            </div>
          )}
        </div>
      </div>

      <AssignVendorModal
        open={openAssignModal}
        setOpen={setOpenAssignModal}
        orderId={id}
      />
      <UpdateOrderTrackingModal
        open={openUpdateOrderTrackingModal}
        setOpen={setUpdateOrderTrackingModal}
        setSuccessOpen={setSuccessOpen}
        orderId={id}
        customerEmail={order.user?.email || "N/A"}
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
