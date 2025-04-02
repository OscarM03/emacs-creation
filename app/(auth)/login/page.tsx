"use client";

import { account } from "@/lib/appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = (formData.get("email") || "") as string;
        const password = (formData.get("password") || "") as string;

        try {
            if (account) {
                await account.createEmailPasswordSession(email, password);
            } else {
                throw new Error("Account instance is not initialized.");
            }
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
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
                        Welcome Back!
                    </h1>

                    <fieldset className="flex flex-col gap-4 mt-4">
                        <legend className="sr-only">Login Form</legend>

                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-lg font-medium text-primary"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="johndoe@gmail.com"
                                className="border-2 py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary"
                                onChange={() => setError(null)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-lg font-medium text-primary"
                            >
                                Password
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
                    </fieldset>

                    {/* Error Message */}
                    {error && (
                        <div className="mt-1 text-center text-sm">
                            <p className="text-red-500">*{error}</p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="bg-primary w-full rounded-md py-3 hover:bg-secondary cursor-pointer mt-3 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        Login
                        {isLoading && <span className="loader"></span>}
                    </button>

                    {/* Links: Register & Forgot Password */}
                    <div className="flex max-lg:flex-col justify-between items-center mt-4">
                        <p className="text-sm">
                            Don&apos;t have an account?
                            <Link
                                href="/register"
                                className="text-secondary ml-1 cursor-pointer hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                        <Link
                            href="/forgot-password"
                            className="text-sm cursor-pointer hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
