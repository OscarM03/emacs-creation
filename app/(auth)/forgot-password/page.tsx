"use client";

import { sendPasswordReset } from "@/actions/user";
import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const res = await sendPasswordReset(email);
    if (res.status === "success") {
      alert("Email sent successfully. Check your inbox.");
    } else {
      setError(res.status);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[90%] sm:w-[60%] md:w-[45%] lg:w-[38%] xl:w-[32%]">
        <form className="shadow-lg p-6 rounded-md w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

          <fieldset className="flex flex-col gap-4 mt-4">
            <legend className="sr-only">Password Reset Form</legend>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-medium text-primary">
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
          </fieldset>

          {/* Error Message */}
          {error && (
            <div className="mt-1 text-center text-sm">
              <p className="text-red-500">*{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary w-full rounded-md py-3 hover:bg-secondary cursor-pointer mt-3 flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Submit Email
            {isLoading && <span className="loader"></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
