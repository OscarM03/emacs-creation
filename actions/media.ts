"use server"


import { createAdminClient } from "@/lib/appwrite/appwrite.server";
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

// export const createMedia = async ({
//     files,
//     type,
//     category,
// }: {
//     files: File[];
//     type: string;
//     category: string;
// }) => {
//     if (!files.length || !type || !category) {
//         return {
//             status: "error",
//             message: "At least one file, category, and type are required",
//         };
//     }

//     const { databases } = await createAdminClient();

//     try {
//         const uploadedMedia = [];

//         for (const file of files) {
//             // Resize the image before uploading it
//             const resizedFile = await resizeImage(file, 800, 600);  // Resize to fit within 800x600 pixels

//             const resizedFileAsFile = new File([new Blob([resizedFile])], file.name, { type: file.type });
//             const fileId = await uploadMedia({ file: resizedFileAsFile });

//             const media = await databases.createDocument(
//                 appWriteConfig.databaseId,
//                 appWriteConfig.collectionId,
//                 ID.unique(),
//                 {
//                     type,
//                     category,
//                     fileId,
//                 }
//             );

//             uploadedMedia.push(media);
//         }

//         return {
//             status: "success",
//             message: `${uploadedMedia.length} media item(s) created successfully`,
//             media: uploadedMedia,
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             status: "error",
//             message: "Failed to create media",
//         };
//     }
// };


// function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<Buffer> {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         reader.onload = function (event) {
//             if (event.target && event.target.result) {
//                 loadImage(event.target.result as string)
//                 .then((img) => {
//                     const canvas = createCanvas(maxWidth, maxHeight);
//                     const ctx = canvas.getContext('2d');

//                     let width = img.width;
//                     let height = img.height;

//                     // Calculate new dimensions to maintain aspect ratio
//                     if (width > height) {
//                         if (width > maxWidth) {
//                             height = (height * maxWidth) / width;
//                             width = maxWidth;
//                         }
//                     } else {
//                         if (height > maxHeight) {
//                             width = (width * maxHeight) / height;
//                             height = maxHeight;
//                         }
//                     }

//                     // Set canvas size to the new dimensions
//                     canvas.width = width;
//                     canvas.height = height;

//                     // Draw the resized image on the canvas
//                     ctx.drawImage(img, 0, 0, width, height);

//                     // Convert canvas to Buffer and resolve with the resized image
//                     canvas.toBuffer((err, buffer) => {
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(buffer);
//                         }
//                     });
//                 })
//                 .catch(reject);
//         };

//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     }});
// }



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

        console.log("Formatted Media:", formattedMedia); 
        return {
            status: "success",
            message: "Media fetched successfully",
            media: formattedMedia,
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