import { Client, Account, Databases, Storage } from "appwrite";

// Ensure Appwrite is only initialized in the browser
const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

if (!endpoint || !project) {
    throw new Error("❌ Appwrite environment variables are missing!");
}

client.setEndpoint(endpoint).setProject(project);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);

