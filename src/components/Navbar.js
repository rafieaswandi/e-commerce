"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { TiUserOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useAuth } from "@/core/useAuth";
import { IoSearchCircleOutline } from "react-icons/io5";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-8" />
        <span className="font-notoserif font-bold">{Config.appName()}</span>
      </Link>

      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
        />
        <button type="submit" className="absolute right-3 top-2 text-gray-600">
          <IoSearchCircleOutline size={24} />
        </button>
      </form>

      <nav className="text-3xl flex items-center gap-3">
        <Link href="/cart">
          <IoCartOutline />
        </Link>
        <button type="button" onClick={() => setOpen(!open)}>
          <TiUserOutline />
        </button>
      </nav>

      <div className={`absolute flex flex-col gap-2 bg-white shadow-lg top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out origin-top-right ${open ? "scale-100" : "scale-0 opacity-0"}`}>
        {user ? (
          <Fragment>
            <Link href="/profile" className="py-2 px-4 hover:bg-gray-100 text-start">
              Profile
            </Link>
            <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start">
             My Order
            </Link>
            <button type="button" onClick={logout} className="py-2 px-4 hover:bg-gray-100 text-start">
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">
              Login
            </Link>
            <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start">
              Register
            </Link>
          </Fragment>
        )}
      </div>
    </header>
  );
}
