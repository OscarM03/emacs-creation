"use server"


import { createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { createSessionClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { Models } from "appwrite";


const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7);





export const requireAuth = async (): Promise<Models.User<Models.Preferences>> => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get(); // Validate session by fetching user info
        return user; // Return user details if authenticated
    } catch (error) {
        console.error("Authentication Error:", error);
        redirect("/login"); // Redirect to login if session is invalid
    }
};



export const loginUser = async (email: string, password: string) => {
    const { account } = await createAdminClient();
  try {
    const session = await account.createEmailPasswordSession(email, password);

    // Store session ID in a secure cookie
    (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: expiryDate,
    });

    return {
      status: "success",
      message: "Login successful",
      session,
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Login failed",
    };
  }
};


export const sendPasswordReset = async (email: string) => {
    const { account } = await createAdminClient(); // Appwrite account client

    try {
        await account.createRecovery(email, `${process.env.NEXT_PUBLIC_API_URL}/reset-password`);

        return {
            status: "success",
            message: "Password reset link sent. Check your email.",
        };
    } catch (error) {
        console.error("Password Reset Error:", error);
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to send password reset link",
        };
    }
};


export const resetPassword = async (userId: string, secret: string, newPassword: string) => {
    const { account } = await createAdminClient(); // Appwrite account client

    try {
        await account.updateRecovery(userId, secret, newPassword);

        return {
            status: "success",
            message: "Password reset successful! You can now log in.",
        };
    } catch (error) {
        console.error("Password Reset Error:", error);
        return {
            status: "error",
            message: error instanceof Error ? error.message : "Failed to reset password",
        };
    }
};
