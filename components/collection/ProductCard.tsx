import Image from "next/image";
import shoppingCart from "@/assets/icons/shopping-cart.svg";
import Link from "next/link";
import { formatPriceKeepSymbol } from "@/utils/utils";
import { Check } from "lucide-react";

export default function ProductCard({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  return (
    <div key={index} className="flex gap-4">
      <div className="relative w-6 h-6">
        <input
          type="checkbox"
          className="peer appearance-none w-6 h-6 rounded-md border border-gray-300 checked:bg-[#22C55E] checked:border-[#22C55E] cursor-pointer"
        />

        <Check
          size={14}
          className="text-white absolute inset-0 m-auto hidden peer-checked:block pointer-events-none"
        />
      </div>

      <div className="rounded-2xl border-[0.6px] border-[#EFEEEE] bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-w-[280px] max-w-[302px] w-full">
        {/* <Link href={`/products/${product.id}`}> */}
        <div>
          <div className="w-full h-[150px] relative rounded-tr-2xl rounded-tl-2xl overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover pb-[14.56px]"
            />
          </div>

          <div className="px-4 ">
            <span className="inline-block bg-[#ADFFD0] text-[#2A2A2A] px-3 py-1.5 rounded-full text-[12px] leading-[18px] mb-4 w-fit truncate max-w-full">
              {product.category.name}
            </span>

            <div className="mb-4 space-y-2">
              <h3 className="md:text-[20px] text-[18px] md:leading-[30px] leading-7 font-medium text-[#2A2A2A] line-clamp-1">
                {product.name}
              </h3>
              <p className="md:text-[15px] text-[12px] md:leading-5 leading-[18px] text-[#787878] line-clamp-3">
                {product.description}
              </p>
            </div>
          </div>
        </div>
        {/* </Link> */}

        <div className="flex md:items-center items-start justify-between flex-col md:flex-row gap-2.5 md:gap-0 pb-4 px-4">
          <p className="md:text-[20px] text-[18px] leading-7 md:leading-[30px] md:font-medium font-semibold text-[#2A2A2A]">
            {product.price}
            {/* {formatPriceKeepSymbol(product.price)} */}
          </p>
        </div>
      </div>
    </div>
  );
}
