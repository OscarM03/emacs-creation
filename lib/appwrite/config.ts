export const appWriteConfig = {
    endpointUrl: process.env.NEXT_APPWRITE_ENDPOINT!,
    imageEndpointUrl: process.env.NEXT_APPWRITE_IMAGE_ENDPOINT!,
    projectId: process.env.NEXT_APPWRITE_PROJECT!,
    databaseId: process.env.NEXT_APPWRITE_DATABASE!,
    collectionId: process.env.NEXT_APPWRITE_COLLECTION!,
    bucketId: process.env.NEXT_APPWRITE_BUCKET!,
    apiKey: process.env.NEXT_APPWRITE_API_KEY!,
    secretKey: process.env.NEXT_APPWRITE_KEY!,
}