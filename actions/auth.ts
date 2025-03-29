"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import type { AuthUser, AuthError } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

interface AuthCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials extends AuthCredentials {
    username: string;
}

interface ResetPasswordParams {
    password: string;
    code: string;
}

interface AuthResponse {
    status: string;
    user?: AuthUser | null;
    message?: string;
}

export const signUp = async ({
    username,
    email,
    password,
}: SignUpCredentials): Promise<AuthResponse> => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { username },
        },
    });

    if (error) {
        return { status: error.message, user: null };
    }
    if (!data?.user) {
        return { status: "User already exists, please login", user: null };
    }

    return { status: "success", user: data.user };
};

export const signIn = async ({
    email,
    password,
}: AuthCredentials): Promise<AuthResponse> => {
    if (!email || !password) {
        return { status: "Email and password are required", user: null };
    }

    const supabase = await createClient();
    const {
        data,
        error,
    }: { data: { user: AuthUser | null }; error: AuthError | null } =
        await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { status: error.message || "An error occurred", user: null };
    }

    return { status: "success", user: data.user };
};

export const signOut = async (): Promise<void> => {
    const supabase = await createClient();
    const { error }: { error: AuthError | null } =
        await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }
    redirect("/login");
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user", error.message);
        return null;
    }

    return data?.user || null;
};

export const sendPasswordResetEmail = async ({
    email,
}: {
    email: string;
}): Promise<AuthResponse> => {
    const supabase = await createClient();

    // Get the origin safely
    const origin =
        (await headers()).get("origin") ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

    // Send reset email with redirect link
    const { error }: { error: AuthError | null } =
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${origin}/reset-password`,
        });

    if (error) {
        console.error("Error sending reset email:", error);
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Reset Email sent!" };
};

export const resetPassword = async ({
    password,
    code,
}: ResetPasswordParams): Promise<AuthResponse> => {
    const supabase = await createClient();
    if (!code) {
        return { status: "error", message: "Invalid or missing reset code." };
    }

    console.log("Reset code received:", code);

    // Exchange the reset token (code) for a session
    const { error: codeError }: { error: AuthError | null } =
        await supabase.auth.exchangeCodeForSession(code);
    if (codeError) {
        console.error("Code exchange error:", codeError);
        return { status: "error", message: codeError.message };
    }

    // Update the user's password
    const { error }: { error: AuthError | null } =
        await supabase.auth.updateUser({ password });
    if (error) {
        console.error("Password update error:", error);
        return { status: "error", message: error.message };
    }

    return { status: "success", message: "Password reset successfully" };
};

export const uploadMedia = async (
    file: File,
    category: string,
    type: "image" | "video"
) => {
    if (!file || !category || !type) {
        return {
            status: "error",
            message: "File, category, and type are required",
        };
    }
    const supabase = await createClient();
    const fileExt = file.name.split(".").pop();
    const filePath = `media/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from("media")
        .upload(filePath, file);

    if (error) {
        return { status: "error", message: error.message };
    }
    console.log("File uploaded successfully", data);

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

    const { error: dbError } = await supabase.from("media").insert([
        {
            url: fileUrl,
            category,
            type,
        },
    ]);

    if (dbError) {
        return { status: "error", message: dbError.message };
    }

    return {
        status: "success",
        message: "Media uploaded successfully",
        url: fileUrl,
        type,
    };
};

export const getMedia = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("media").select("*");

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", data };
};

export const updateMedia = async (
    id: string,
    category: string,
    type: "image" | "video"
) => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("media")
        .update({ category, type })
        .eq("id", id);

    if (error) {
        return { status: "error", message: error.message };
    }

    return { status: "success", data };
};

export const deleteMedia = async (id: string, fileUrl: string) => {
    const supabase = await createClient();
    const filePath = fileUrl.split("/storage/v1/object/public/media/")[1];

    const { error: storageError } = await supabase.storage
        .from("media")
        .remove([filePath]);

    if (storageError) {
        return { status: "error", message: storageError.message };
    }

    const { error: dbError } = await supabase
        .from("media")
        .delete()
        .eq("id", id);

    if (dbError) {
        return {
            status: "error",
            message: "Failed to delete from database: " + dbError.message,
        };
    }

    return { status: "success", message: "Media deleted successfully" };
};

export const Emailhandler = async (
    name: string,
    email: string,
    phoneNumber: number | string,
    service: string,
    message: string
) => {
    if (!name || !email || !message || !phoneNumber) {
        return { message: "Please fill in all fields" };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from:  `"Emacs Creation" - <${email}>`,
            to: "oscarmutwiri03@gmail.com",
            replyTo: email,
            subject: "New Contact Request",
            text: `You have a new contact request:\n\nName: ${name}\nEmail: ${email}\nPhone Number: +254${phoneNumber}\nService: ${service}\nMessage: ${message}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Phone Number:</strong> +254${phoneNumber}</p>
                   <p><strong>Service:</strong> ${service}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        });

        console.log("Email sent successfully!");
        return { status: "success", message: "Email sent successfully!" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { status: "error", message: "Failed to send email" };
    }
};
