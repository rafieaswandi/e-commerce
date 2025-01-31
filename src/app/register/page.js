import Image from "next/image";
import RegisterForm from "./_partials/RegisterForm";

export const metadata = {
    title: "Register"
};

export default function Register() {
    return (
        <div className="flex h-screen">
            <Image src="/register-img.png" alt="Login Image" width={2000} height={2000} className="hidden md:block w-1/2 object-cover" />
            <RegisterForm />
        </div>
    );
}