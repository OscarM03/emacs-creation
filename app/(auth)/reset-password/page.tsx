"use client";

import { resetPassword } from "@/actions/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    // Get search params synchronously
    let userId: string | null = null;
    let secret: string | null = null;

    if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        userId = params.get("userId");
        secret = params.get("secret");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!userId || !secret) {
            setError("Invalid or expired reset link.");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const res = await resetPassword(userId, secret, password);

        if (res.status === "success") {
            router.push("/dashboard");
        } else {
            setError(res.message ?? "An unexpected error occurred");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[90%] sm:w-[60%] md:w-[45%] lg:w-[38%] xl:w-[32%]">
                <form
                    className="shadow-lg p-6 rounded-md w-full"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-2xl font-bold text-center">
                        Reset Password
                    </h1>

                    <fieldset className="flex flex-col gap-4 mt-4">
                        <legend className="sr-only">New Password Form</legend>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="text-lg font-medium text-primary">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="*******"
                                className="border-2 py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary"
                                onChange={() => setError(null)}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="confirmPassword" className="text-lg font-medium text-primary">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="*******"
                                className="border-2 py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary"
                                onChange={() => setError(null)}
                                required
                            />
                        </div>
                    </fieldset>

                    {error && (
                        <div className="mt-1 text-center text-sm">
                            <p className="text-red-500">*{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-primary w-full rounded-md py-3 hover:bg-secondary cursor-pointer mt-3 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        Create New Password
                        {isLoading && <span className="loader"></span>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
