"use client";

import { useAuth } from "@/core/useAuth";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  const user = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <p className="text-red-500 font-semibold">You are not logged in. Please log in first.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="p-8 bg-white shadow-lg rounded-lg w-full max-w-md text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src={user.avatar || "/profile.png"}
              alt="Profile Picture"
              fill
              className="rounded-full border-4 border-gray-300 object-cover"
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">{user.name || "Nama Pengguna"}</h1>
          <p className="text-gray-600">{user.email || "Email tidak found"}</p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="flex items-center bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={() => router.push("/profile/edit")}
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>

            <button
              className="flex items-center bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
