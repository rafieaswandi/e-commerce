"use client"
import React, { useState, useEffect } from "react";

export default function ProfilePage() {
  
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-profile`,
          {
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {error}. Please try again later.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mt-4">My Profile</h1>
      <div className="mt-8 flex flex-col items-center">
        <div className="relative">
          <img
            src={user.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 w-80">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Personal Information
          </h2>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-700">{user.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-700">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
