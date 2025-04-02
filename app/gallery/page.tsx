"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MediaType } from "@/components/dashboard/MediaForm";
import { getMedia } from "@/actions/media";

const categories = [
    "Wedding",
    "Portrait",
    "Photography",
    "Videography",
    "Studio",
    "BTS",
];

const limit = 25; // Number of items per page

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [media, setMedia] = useState<MediaType[]>([]);
    const [filteredData, setFilteredData] = useState<MediaType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Wedding");
    const [mediaType, setMediaType] = useState<"Images" | "Videos" | "All">("All");
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false); // Track category loading

    // Fetch media based on pagination and category
    const fetchMedia = React.useCallback(async (reset = false) => {
        if (loading) return;
        if (reset) setLoadingCategory(true); // Start category loading

        setLoading(true);
        const response = await getMedia(limit, reset ? 0 : offset, selectedCategory);

        if (response.status === "success") {
            const newMedia = response.media || [];

            if (reset) {
                setMedia(newMedia);
                setFilteredData(newMedia);
                setOffset(limit);
            } else {
                setMedia((prev) => [...prev, ...newMedia]);
                setFilteredData((prev) => [...prev, ...newMedia]);
                setOffset((prev) => prev + limit);
            }

            setHasMore(newMedia.length === limit);
        }

        setLoading(false);
        if (reset) setLoadingCategory(false); // Stop category loading
    }, [loading, offset, selectedCategory]);

    // Load media when category changes
    useEffect(() => {
        setOffset(0);
        fetchMedia(true);
    }, [selectedCategory]);

    // Filter media based on type
    useEffect(() => {
        let filtered = media;
        if (mediaType !== "All") {
            const typeFilter = mediaType === "Images" ? "image" : "video";
            filtered = filtered.filter((item) => item.type === typeFilter);
        }
        setFilteredData(filtered);
    }, [mediaType, media]);

    return (
        <section className="container">
            <div className="section-w">
                <h1 className="py-2 text-gray-500 font-medium border-b">
                    <Link href="/" className="cursor-pointer">Home</Link>
                    /gallery
                </h1>

                {/* Categories */}
                <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
                    {categories.map((category) => (
                        <h1
                            key={category}
                            className={`bg-gray-100 font-medium px-3 py-2 rounded-full ${
                                selectedCategory === category ? "text-primary font-bold" : "text-black"
                            } cursor-pointer hover:bg-gray-200 transition ${
                                loadingCategory && "opacity-50 pointer-events-none" // Disable while loading
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </h1>
                    ))}
                </div>

                {/* Image / Video Toggle */}
                <div className="flex justify-center items-center mt-4">
                    {["All", "Images", "Videos"].map((type) => (
                        <div key={type} className="flex items-center">
                            <h1
                                className={`text-lg font-medium px-4 cursor-pointer ${
                                    mediaType === type ? "text-primary font-bold" : "text-gray-500"
                                }`}
                                onClick={() => setMediaType(type as "Images" | "Videos" | "All")}
                            >
                                {type}
                            </h1>
                            {type !== "Videos" && <span className="text-lg text-black font-bold">|</span>}
                        </div>
                    ))}
                </div>

                {/* Show Loading Spinner when Switching Categories */}
                {loadingCategory && (
                    <p className="text-center text-primary font-semibold mt-4">Loading {selectedCategory} category...</p>
                )}

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                    {loading && !filteredData.length ? (
                        // Skeleton Loading Effect
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="w-full h-60 bg-gray-300 animate-pulse rounded-md"></div>
                        ))
                    ) : (
                        filteredData.map((item) => (
                            <div
                                key={item.$id}
                                className="w-full relative cursor-pointer"
                                onClick={() => setSelectedImage(item.url)}
                            >
                                {item.type === "image" ? (
                                    <Image
                                        src={item.url}
                                        alt={item.category}
                                        width={800}
                                        height={600}
                                        style={{ objectFit: "cover" }}
                                        className="rounded-md hover:opacity-80 transition-opacity duration-300"
                                    />
                                ) : (
                                    <video className="w-full h-full rounded-md hover:opacity-80 transition-opacity duration-300" controls>
                                        <source src={item.url} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Load More Button */}
                {hasMore && !loadingCategory && (
                    <div className="flex justify-end my-6">
                        <button
                            onClick={() => fetchMedia()}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>

            {/* Modal for Enlarged Image */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-3xl w-full p-4">
                        <button className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2" onClick={() => setSelectedImage(null)}>
                            ✕
                        </button>
                        <Image src={selectedImage} alt="Expanded view" width={800} height={600} className="rounded-md" />
                    </div>
                </div>
            )}
        </section>
    );
};


export default Gallery;