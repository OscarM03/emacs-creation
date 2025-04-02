"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ID, } from "appwrite";
import { appWriteConfig } from "@/lib/appwrite/config"; // Import your Appwrite config
import { account, database, storage } from "@/lib/appwrite";


export type MediaType = {
    $id: string;
    fileId: string;
    url: string;
    category: string;
    type: "image" | "video";
    $createdAt: string;
    $updatedAt: string;
};

type MediaFormProps = {
    onClose: () => void;
    onUploadSuccess: () => void;
};

const MediaForm: React.FC<MediaFormProps> = ({ onClose, onUploadSuccess }) => {
    const [category, setCategory] = useState("");
    const [type, setType] = useState<"image" | "video" | "">("");
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const handleUpload = async () => {
        if (!files.length || !category || !type) {
            setError("Please select a category, type, and at least one file.");
            return;
        }
    
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
    
        try {
            // ✅ Step 1: Verify if the user is authenticated
            const user = await account.get();
    
            if (!user) {
                setError("You must be logged in to upload files.");
                setIsLoading(false);
                return;
            }
    
            const uploadedMedia = [];
    
            for (const file of files) {
                // ✅ Step 2: Upload file to Appwrite Storage
                const uploadedFile = await storage.createFile(
                    appWriteConfig.bucketId,
                    ID.unique(),
                    file
                );
    
                // ✅ Step 3: Save file metadata in Appwrite Database
                const media = await database.createDocument(
                    appWriteConfig.databaseId,
                    appWriteConfig.collectionId,
                    ID.unique(),
                    {
                        type,
                        category,
                        fileId: uploadedFile.$id,
                    }
                );
    
                uploadedMedia.push(media);
            }
    
            setSuccessMessage(`${uploadedMedia.length} media item(s) uploaded successfully.`);
            onUploadSuccess();
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            setError("Failed to upload media. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-6 mt-4 shadow-lg lg:w-1/2 relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
                Upload Content
            </h2>

            <div className="mb-4 flex flex-col gap-2">
                <Label>Select Type</Label>
                <Select
                    value={type}
                    onValueChange={(value) =>
                        setType(value as "image" | "video")
                    }
                    disabled={isLoading}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-4 flex flex-col gap-2">
                <Label>Select Category</Label>
                <Select
                    value={category}
                    onValueChange={setCategory}
                    disabled={isLoading}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="videography">Videography</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Portrait">Portrait</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                        <SelectItem value="BTS">BTS</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-4 flex flex-col gap-2">
                <Label>Upload Files</Label>
                <Input
                    type="file"
                    multiple
                    onChange={(e) =>
                        setFiles(
                            e.target.files ? Array.from(e.target.files) : []
                        )
                    }
                    disabled={isLoading}
                />
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}

            <button
                className="py-2 px-3 bg-primary rounded-md text-white font-bold hover:bg-secondary w-full flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleUpload}
                disabled={isLoading || files.length === 0}
            >
                {isLoading ? "Uploading..." : "Upload Media"}
            </button>

            <button
                className="absolute top-0 right-2 text-3xl"
                onClick={onClose}
                disabled={isLoading}
            >
                &times;
            </button>
        </Card>
    );
};

export default MediaForm;
