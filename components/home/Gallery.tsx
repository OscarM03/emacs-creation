"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MediaType } from "../dashboard/MediaForm";
import Link from "next/link";
import { getMedia } from "@/actions/media";

const categories = [
    "Wedding",
    "Portrait",
    "Photography",
    "Videography",
    "Studio",
    "BTS",
];

const Gallery: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [media, setMedia] = useState<MediaType[]>([]);
    const [filteredData, setFilteredData] = useState<MediaType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("Wedding");
    const [mediaType, setMediaType] = useState<"Images" | "Videos" | "All">(
        "All"
    );

    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        const fetchMedia = async () => {
            setLoading(true); // Start loading
            const response = await getMedia(25, 0, selectedCategory);
            if (response.status === "success") {
                setMedia(response.media || []);
                setFilteredData(response.media || []);
            }
            setLoading(false); // Stop loading
        };
        fetchMedia();
    }, [selectedCategory]);

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
            <div className="section-w mt-16">
                <h1 className="text-2xl font-bold text-center">Gallery</h1>

                {/* Categories */}
                <div className="flex justify-center items-center gap-4 mt-4 flex-wrap">
                    {categories.map((category) => (
                        <h1
                            key={category}
                            className={`bg-gray-100 font-medium px-3 py-2 rounded-full ${
                                selectedCategory === category
                                    ? "text-primary font-bold"
                                    : "text-black"
                            } cursor-pointer hover:bg-gray-200 transition`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </h1>
                    ))}
                </div>

                {/* Image / Video Toggle */}
                <div className="flex justify-center items-center mt-4">
                    {["All", "Images", "Videos"].map((type) => (
                        <React.Fragment key={type}>
                            <h1
                                className={`text-lg font-medium px-4 cursor-pointer ${
                                    mediaType === type
                                        ? "text-primary font-bold"
                                        : "text-gray-500"
                                }`}
                                onClick={() =>
                                    setMediaType(
                                        type as "Images" | "Videos" | "All"
                                    )
                                }
                            >
                                {type}
                            </h1>
                            {type !== "Videos" && (
                                <span className="text-lg text-black font-bold">
                                    |
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <p className="text-center text-primary font-semibold mt-4">
                        Loading...
                    </p>
                )}

                {/* Gallery Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                        {filteredData.map((item) => (
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
                                    <video
                                        className="w-full h-full rounded-md hover:opacity-80 transition-opacity duration-300"
                                        controls
                                    >
                                        <source
                                            src={item.url}
                                            type="video/mp4"
                                        />
                                    </video>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <Link href="/gallery">
                    <button className="mt-2 flex justify-end items-center gap-2 text-primary font-medium w-full cursor-pointer hover:text-secondary">
                        View More
                        <FaLongArrowAltRight className="" />
                    </button>
                </Link>
            </div>

            {/* Modal for Enlarged Image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-3xl w-full p-4">
                        <button
                            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <Image
                            src={selectedImage}
                            alt="Expanded view"
                            width={800}
                            height={600}
                            className="rounded-md"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
