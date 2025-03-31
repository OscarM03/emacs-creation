"use server"
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import {appWriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
    // Create a new Appwrite client instance
    const client = new Client()
      .setEndpoint(appWriteConfig.endpointUrl) // Set the API endpoint URL from the configuration
      .setProject(appWriteConfig.projectId);  // Set the project ID from the configuration
  
    // Retrieve the "appwrite-session" cookie that stores the user's session information
    const session = (await cookies()).get("appwrite-session");
  
    // If the session cookie doesn't exist or has no value, throw an error
    if (!session || !session.value) throw new Error("No session found");
  
    // Set the session in the client instance for user authentication
    client.setSession(session.value);
  
    // Return an object with "account" and "database" properties, providing easy access to Appwrite features
    return {
      // Getter for account-related operations (e.g., user profile management)
      get account() {
        return new Account(client); // Initialize and return an Account instance tied to the client
      },
      // Getter for database-related operations (e.g., CRUD operations on collections)
      get databases() {
        return new Databases(client); // Initialize and return a Databases instance tied to the client
      },
    };
  };

// Define an asynchronous function to create a client with admin privileges
export const createAdminClient = async () => {
    // Create a new Appwrite client instance
    const client = new Client()
      .setEndpoint(appWriteConfig.endpointUrl) // Set the API endpoint URL from the configuration
      .setProject(appWriteConfig.projectId)   // Set the project ID from the configuration
      .setKey(appWriteConfig.secretKey);      // Set the secret key for admin authentication
  
    // Return an object with properties for accessing various Appwrite services
    return {
      // Getter for account-related operations
      get account() {
        return new Account(client); // Initialize and return an Account instance tied to the client
      },
      // Getter for database-related operations
      get databases() {
        return new Databases(client); // Initialize and return a Databases instance tied to the client
      },
      // Getter for storage-related operations (e.g., file uploads and management)
      get storage() {
        return new Storage(client); // Initialize and return a Storage instance tied to the client
      },
      // Getter for avatar-related operations (e.g., generating user avatars)
      get avatars() {
        return new Avatars(client); // Initialize and return an Avatars instance tied to the client
      }
    };
  };