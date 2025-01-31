"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { useState } from "react";

export default function LoginForm() {
    const [obscurePassword, setObscurePassword] = useState(true);

    const toggleObscurePassword = () => {
        setObscurePassword(!obscurePassword);
    };

    return (
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4">
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
                <span>{ Config.appName() }</span>
            </Link>
            <div className="h-px w-1/2 bg-dark/20"></div>
            <h1 className="text-2x1 font-bold">Login</h1>
            <CustomInput type="email" id="email" name="email" placeholder="Enter your email" required={true} className={"w-2/3"}/>
            <div className="w-2/3 relative">
                <CustomInput 
                    type={obscurePassword ? "password" : "text"}
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    required={true} 
                    className={"w-full"}
                />
                <button 
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    onClick={toggleObscurePassword}
                >
                    {obscurePassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
            </div>
            <FilledButton type="submit" className={"w-2/3"}>
                Login <LuLogIn className="text-2xl"/>
            </FilledButton>
            <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold hover:underline">Register</Link>
            </p>
        </form>
    )
}