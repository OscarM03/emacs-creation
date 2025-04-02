"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MediaForm, { MediaType } from "@/components/dashboard/MediaForm";
import Link from "next/link";
import { deleteMedia, getMedia } from "@/actions/media";

const limit = 25; // Number of items per page

const Page: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [media, setMedia] = useState<MediaType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchMedia = async (reset = false) => {
        if (isLoading) return;
        setIsLoading(true);

        const response = await getMedia(limit, reset ? 0 : offset);
        if (response.status === "success") {
            const newMedia = response.media || [];

            if (reset) {
                setMedia(newMedia);
                setOffset(limit);
            } else {
                setMedia((prev) => [...prev, ...newMedia]);
                setOffset((prev) => prev + limit);
            }

            setHasMore(newMedia.length === limit);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMedia(true);
    }, []);

    const handleDelete = async (id: string, fileId: string) => {
        setIsLoading(true);
        const response = await deleteMedia({ id, fileId });
        if (response.status === "success") {
            await fetchMedia(true);
        }
        setIsLoading(false);
    };

    return (
        <section className="container">
            <div className="section-w">
                <h1 className="py-2 text-gray-500 font-medium border-b">
                    <Link href="/" className="cursor-pointer">
                        Home
                    </Link>
                    /dashboard
                </h1>
                <Button
                    className="bg-primary text-white p-6 rounded-md mt-4"
                    onClick={() => {
                        setShowForm(true);
                    }}
                >
                    Add Content +
                </Button>
                {showForm && (
                    <MediaForm
                        onClose={() => setShowForm(false)}
                        onUploadSuccess={() => fetchMedia(true)}
                    />
                )}
                <h2 className="text-xl font-semibold mt-6">Uploaded Content</h2>
                {isLoading && <p className="text-center text-gray-500">Loading...</p>}
                <table className="w-full border-collapse border border-gray-300 mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Preview</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {media.map((item) => (
                            <tr key={item.$id} className="border">
                                <td className="border p-2">
                                    {item.type === "image" ? (
                                        <Image
                                            src={item.url}
                                            width={200}
                                            height={200}
                                            alt={item.category}
                                        />
                                    ) : (
                                        <video width="200" height="200" controls>
                                            <source src={item.url} type="video/mp4" />
                                        </video>
                                    )}
                                </td>
                                <td className="border p-2 text-center">{item.type}</td>
                                <td className="border p-2 text-center">{item.category}</td>
                                <td className="p-2 flex flex-col justify-center items-center space-y-4">
                                    <Button
                                        className="bg-primary text-white"
                                        onClick={() => handleDelete(item.$id, item.fileId)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Load More Button */}
                {hasMore && (
                    <div className="flex justify-center mt-6">
                        <Button
                            onClick={() => fetchMedia()}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Load More"}
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Page;
