import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { appWriteConfig } from "./appwrite/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const imageUrl = (fileId: string) => {
  return `${appWriteConfig.imageEndpointUrl}${appWriteConfig.bucketId}/files/${fileId}/view?project=${appWriteConfig.projectId}&mode=admin`;
}
