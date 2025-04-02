"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MediaForm, { MediaType } from "@/components/dashboard/MediaForm";
import Link from "next/link";
import {
    deleteMedia,
    getMedia,
} from "@/actions/media";

const Page: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [media, setMedia] = useState<MediaType[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    const fetchMedia = async () => {
        setIsLoading(true);
        const response = await getMedia();
        console.log("Fetched Media:", response.media); // Log the fetched media
        if (response.status === "success") {
            setMedia(response.media || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMedia();
    }, []);



    const handleDelete = async (id: string, fileId: string) => {
        setIsLoading(true);
        const response = await deleteMedia({ id, fileId });
        if (response.status === "success") {
            await fetchMedia();
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
                        onUploadSuccess={fetchMedia}
                    />
                )}
                <h2 className="text-xl font-semibold mt-6">Uploaded Content</h2>
                {isLoading && (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
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
                                        <video
                                            width="200"
                                            height="200"
                                            controls
                                        >
                                            <source
                                                src={item.url}
                                                type="video/mp4"
                                            />
                                        </video>
                                    )}
                                </td>
                                <td className="border p-2 text-center">
                                    {item.type}
                                </td>
                                <td className="border p-2 text-center">
                                    {item.category}
                                </td>
                                <td className="p-2 flex flex-col justify-center items-center space-y-4">
                                    {/* <Button
                                        className="bg-primary text-white"
                                        onClick={() => {
                                            setShowForm(true);
                                        }}
                                    >
                                        Edit
                                    </Button> */}
                                    <Button
                                        className="bg-primary text-white"
                                        onClick={() =>
                                            handleDelete(item.$id, item.fileId)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
export default Page;
