import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bbqfckhsoxnxkckqfeof.supabase.co",
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
