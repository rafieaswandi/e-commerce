"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import { IoCartOutline, IoSearchCircleOutline } from "react-icons/io5";
import { TiUserOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useAuth } from "@/core/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);
  const router = useRouter();
  
  const toggleMenu = () => setOpen(!open);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  // Tutup search jika klik di luar atau tekan ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const user = useAuth("/");

  return (
    <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={100} height={100} className="w-8" />
        <span className="font-notoserif font-bold">{Config.appName()}</span>
      </Link>
      {searchOpen && (
        <form
          ref={searchRef}
          onSubmit={handleSearchSubmit}
          className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-3 rounded-lg flex items-center gap-2 w-[300px] sm:w-[400px]"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="text-blue-500 hover:text-blue-700">
            <IoSearchCircleOutline size={24} />
          </button>
        </form>
      )}
      <nav className="text-3xl flex items-center gap-3">
        <button onClick={toggleSearch}>
          <IoSearchCircleOutline />
        </button>
        <Link href="/cart">
          <IoCartOutline />
        </Link>
        <button type="button" onClick={toggleMenu}>
          <TiUserOutline />
        </button>
      </nav>
      <div
        className={
          "absolute flex flex-col gap-2 bg-white shadow-lg top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out origin-top-right " +
          (open ? "scale-100" : "scale-0 opacity-0")
        }
      >
        {user ? (
          <Fragment>
            <Link href="/profile" className="py-2 px-4 hover:bg-gray-100 text-start">Profile</Link>
            <Link href="/cart" className="py-2 px-4 hover:bg-gray-100 text-start">My Orders</Link>
            <button type="button" onClick={logout} className="py-2 px-4 hover:bg-gray-100 text-start">
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">Login</Link>
            <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start">Register</Link>
          </Fragment>
        )}
      </div>
    </header>
  );
}
