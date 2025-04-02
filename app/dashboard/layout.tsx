"use client"; // Ensure this is client-side

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting

import { account } from "@/lib/appwrite"; // Import Appwrite client

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true); // To track if user check is complete
    const router = useRouter(); // For redirection

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await account.get(); // Get the authenticated user from Appwrite
                console.log(user); // Log the user object (optional)
                setLoading(false); // Set loading to false after checking user
            } catch (error) {
                console.error("User not authenticated:", error);
                router.push("/login"); // Redirect to login if user is not authenticated
            }
        };

        checkAuth(); // Call the authentication check on component mount
    }, [router]); // Ensure that router object is included in the dependency array

    if (loading) {
        return <p>Loading...</p>; // Optionally show a loading message while checking
    }

    return <>{children}</>; // If user is authenticated, render the children
}
