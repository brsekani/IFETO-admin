"use client";

import Image from "next/image";
import arrowLeft from "@/assets/svgs/arrow-left.svg";
import ProductCard from "@/components/collection/ProductCard";
import authImg from "@/assets/images/authImg.png";

export default function Page() {
  const products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      description:
        "High-quality wireless headphones with noise cancellation and 30 hours battery life.",
      price: 129.99,
      images: [authImg],
      category: {
        name: "Electronics",
      },
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      description:
        "Track your heart rate, sleep, and workouts with this sleek fitness smartwatch.",
      price: 89.5,
      images: [authImg],
      category: {
        name: "Wearables",
      },
    },
    {
      id: "3",
      name: "Minimalist Leather Backpack",
      description:
        "Premium leather backpack designed for work, travel, and everyday carry.",
      price: 159.0,
      images: [authImg],
      category: {
        name: "Accessories",
      },
    },
    {
      id: "4",
      name: "Portable Bluetooth Speaker",
      description:
        "Compact speaker with deep bass, waterproof design, and 12-hour playtime.",
      price: 59.99,
      images: [authImg],
      category: {
        name: "Audio",
      },
    },
  ];
  return (
    <div className="bg-[#FAFAFA] space-y-8 min-h-[85vh] h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-row gap-2 md:py-6 py-3 md:px-8 px-6 shadow-custom2 items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Image src={arrowLeft} alt="arrow-back" />
            <p className="text-[16px] leading-6 font-semibold text-[#787878]">
              back
            </p>
          </div>

          <h1 className="md:text-[24px] text-[16px] md:leading-8 leading-6 text-[#5A5A5A] font-semibold md:w-full md:text-start w-full text-center">
            Add Products
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[26px]">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
