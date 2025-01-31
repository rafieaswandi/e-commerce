import Image from "next/image";
import LoginForm from "./_partials/LoginForm";

export const metadata = {
    title: "Login"
};

export default function Login() {
    return (
        <div className="flex h-screen">
            <LoginForm />
            <Image src="/login-img.png" alt="Login Image" width={2000} height={2000} className="hidden md:block w-1/2 object-cover" />
        </div>
    );
}