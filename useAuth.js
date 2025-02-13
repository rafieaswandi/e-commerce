"use clinet"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(redirecTo = "/login") {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(Config.baseApiUrl() + "user", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const result = await res.json();
                    setUser(result.data);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                    localStorage.removeItem("token");
                    router.push(redirecTo);
                }
            } else {
                router.push(redirecTo);
            }
        };

        fetchUser();
    }, [router, redirecTo]);

    return user;
}
