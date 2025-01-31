"use client"
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoSearchCircleOutline} from "react-icons/io5";
import { TiUserOutline } from "react-icons/ti";
import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open);
    }
    return (
        <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
            <Link href="/" className="flex items-center">
            <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-8"
            />
            <span className="font-notoserif font-bold">
                {Config.appName()}
            </span>
            </Link>
            <nav className="text-3xl flex items-center gap-3">
                <Link href="/search">
                    <IoSearchCircleOutline />
               </Link>
                <Link href="/cart">
                    <IoCartOutline />
                    </Link>
                <button type="button" onClick={toggleMenu}>
                    <TiUserOutline />
                </button>
            </nav>
            {/* Menu */}
            <div className={"absolute flex flex-col gap-2 bg-white show shadow-lg top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-300 ease-in-out origin-top-right " + (open ? "scale-100" : "scale-0 opacity-0")}>
                <Link href="/login" className="py-2 px-4 hover:bg-gray-100 text-start">Login</Link>
                <Link href="/register" className="py-2 px-4 hover:bg-gray-100 text-start">Sign up</Link>
                <Link href="/profile" className="py-2 px-4 hover:bg-gray-100 text-start">Profile</Link>
                <Link href="/order" className="py-2 px-4 hover:bg-gray-100 text-start">My order</Link>
                <button type="button" className="py-2 px-4 hover:bg-gray-100 text-start">Logout</button>
            </div>
        </header>
    );
}