"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    mediaItem?: MediaType | null;
    onSave: (files: File[], category: string, type: "image" | "video") => void;
    onClose: () => void;
    isLoading: boolean;
};

const MediaForm: React.FC<MediaFormProps> = ({ mediaItem, onSave, onClose, isLoading }) => {
    const [category, setCategory] = useState(mediaItem?.category || "");
    const [type, setType] = useState<"image" | "video" | "">(mediaItem?.type || "");
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Card className="p-6 mt-4 shadow-lg lg:w-1/2 relative">
            <h2 className="text-xl font-semibold mb-4 text-center">{mediaItem ? "Edit Content" : "Upload Content"}</h2>
            <div className="mb-4 flex flex-col gap-2">
                <Label>Select Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as "image" | "video")} disabled={isLoading}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="image" className=" hover:bg-gray-200 ">Image</SelectItem>
                        <SelectItem value="video" className=" hover:bg-gray-200 ">Video</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4 flex flex-col gap-2">
                <Label>Select Category</Label>
                <Select value={category} onValueChange={setCategory} disabled={isLoading}>
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
            {!mediaItem && (
                <div className="mb-4 flex flex-col gap-2">
                    <Label>Upload Files</Label>
                    <Input 
                        type="file" 
                        multiple 
                        onChange={(e) => setFiles(e.target.files ? Array.from(e.target.files) : [])} 
                        disabled={isLoading} 
                    />
                </div>
            )}
            <button 
                className="py-2 px-3 bg-primary rounded-md text-white font-bold hover:bg-secondary w-full flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" 
                onClick={() => onSave(files, category, type as "image" | "video")} 
                disabled={isLoading || files.length === 0}
            >
               Upload Media
               {isLoading && <span className="loader"></span>}
            </button>
            <button className="absolute top-0 right-2 text-3xl" onClick={onClose} disabled={isLoading}>
                &times;
            </button>
        </Card>
    );
};

export default MediaForm;