import { IoIosStar } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/core/helpers";

export default function ProductCard({ href, image, name, category, rating, price }) {
  return (
    <Link 
      href={href} 
      className="flex flex-col gap-4 bg-light text-black p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 min-w-80"
    >
      <div className="overflow-hidden rounded-lg">
        <Image 
          src={image} 
          alt={name} 
          width={750} 
          height={1000} 
          className="w-full aspect-[3/4] object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium bg-dark/10 py-1 px-3 rounded-lg w-fit">
          {category}
        </p>
        <h3 className="text-xl font-bold">{name}</h3>
        {rating && (
          <div className="flex items-center gap-1 text-sm">
            <IoIosStar className="text-yellow-500 text-lg" />
            {rating}
          </div>
        )}
        <p className="text-lg font-semibold">{formatCurrency(price)}</p>
      </div>
    </Link>
  );
}
