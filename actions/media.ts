"use server"

import { createAdminClient } from "@/lib/appwrite";
import { appWriteConfig } from "@/lib/appwrite/config";
import { imageUrl } from "@/lib/utils";
import { ID, Query } from "node-appwrite";

export const uploadMedia = async ({ file }: { file: File }) => {
    if (!file) {
        return {
            status: "error",
            message: "File, category, and type are required",
        };
    }
    const { storage } = await createAdminClient();
    try {
        const media = await storage.createFile(
            appWriteConfig.bucketId,
            ID.unique(),
            file
        );
        return media.$id;
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to upload media",
        };
    }
};

export const createMedia = async ({
    file,
    type,
    category,
}: {
    file: File;
    type: string;
    category: string;
}) => {
    if (!file || !type || !category) {
        return {
            status: "error",
            message: "File, category, and type are required",
        };
    }
    const { databases } = await createAdminClient();
    try {
        const media = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.collectionId,
            ID.unique(),
            {
                type,
                category,
                fileId: await uploadMedia({ file }),
            }
        );
        return {
            status: "success",
            message: "Media created successfully",
            media: media,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to create media",
        };
    }
};

export type MediaType = {
    $id: string; 
    fileId: string;
    url: string;
    category: string;
    type: "image" | "video";
    $createdAt: string;
    $updatedAt: string;
};

export const getMedia = async () => {
    const { databases } = await createAdminClient();
    try {
        const media = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.collectionId,
            [Query.orderDesc("$createdAt")]
        );

        const formattedMedia: MediaType[] = media.documents.map((doc: any) => ({
            $id: doc.$id,
            fileId: doc.fileId,
            url: imageUrl(doc.fileId),
            category: doc.category,
            type: doc.type as "image" | "video",
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
        }));

        console.log("Formatted Media:", formattedMedia); // Debugging line
        return {
            status: "success",
            message: "Media fetched successfully",
            media: formattedMedia, // Now it matches MediaType
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to fetch media",
        };
    }
};


export const updateMedia = async ({
    id,
    type,
    category,
}: {
    id: string;
    type: "image" | "video";
    category: string;
}) => {
    if (!id || !type || !category) {
        return {
            status: "error",
            message: "ID, category, and type are required",
        };
    }
    const { databases } = await createAdminClient();
    try {
        const media = await databases.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.collectionId,
            id,
            {
                type,
                category,
            }
        );
        return {
            status: "success",
            message: "Media updated successfully",
            media: media,
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to update media",
        };
    }
};

export const deleteMedia = async ({
    id,
    fileId,
}: {
    id: string;
    fileId: string;
}) => {
    if (!id || !fileId) {
        return {
            status: "error",
            message: "ID is required",
        };
    }
    const { databases, storage } = await createAdminClient();
    try {
        await databases.deleteDocument(
            appWriteConfig.databaseId,
            appWriteConfig.collectionId,
            id
        );
        await storage.deleteFile(appWriteConfig.bucketId, fileId);
        return {
            status: "success",
            message: "Media deleted successfully",
        };
    } catch (error) {
        console.log(error);
        return {
            status: "error",
            message: "Failed to delete media",
        };
    }

};