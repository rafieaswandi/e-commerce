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
import { useRouter } from "next/router";

export default function RegisterForm() {
    const router = useRouter;
    const [obscurePassword, setObscurePassword] = useState(true);
    const [obscurePass, setObsConfirmPass] = useState(true);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const toggleObscurePassword = () => {
      setObscurePassword(!obscurePassword);
    };
  
    const toggleObsConfirmPassword = () => {
      setObsConfirmPass(!obscurePass);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors(null);
      try {
        // 
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords and confrim passwords doesn't match.");
        }
  
        const res = await fetch(Config.baseApiUrl() + "register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
  
        if (!res.ok) {
          throw new Error(result.message);
        }
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
  
        localStorage.setItem("token", result.data.token);
        router.push("/");
    
      } catch (error) {
        setErrors(error.message);
      } finally {
        setLoading(false);
      }
    };    

    return (
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4">
            <Link href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
                <span>{ Config.appName() }</span>
            </Link>
            <div className="h-px w-1/2 bg-dark/20"></div>
            <h1 className="text-2x1 font-bold">Register</h1>
            <CustomInput type="text" id="name" name="name" placeholder="Enter your name" required={true} className={"w-2/3"}/>
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
            <div className="w-2/3 relative">
                <CustomInput 
                    type={toggleObsConfirmPassword ? "password" : "text"}
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm your password" 
                    required={true} 
                    className={"w-full"}
                />
                <button 
                    type="button"
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                    onClick={toggleObsConfirmPassword}
                >
                    {obscurePassword ? <IoIosEyeOff /> : <IoIosEye />}
                </button>
            </div>
            <FilledButton type="submit" className={"w-2/3"}>
                Register <LuLogIn className="text-2xl"/>
            </FilledButton>
            <p className="text-sm">
                Have an account?{" "}
                <Link href="/login" className="font-semibold hover:underline">Login</Link>
            </p>
        </form>
    )
}