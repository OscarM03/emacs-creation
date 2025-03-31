import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bbqfckhsoxnxkckqfeof.supabase.co",
            },
            {
                protocol: "https",
                hostname: "cloud.appwrite.io",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "50mb",
        },
    },
};

export default nextConfig;
