# Photography & Videography Website

## Overview
This is a simple yet powerful photography and videography website designed to showcase and manage media content efficiently. The platform allows administrators to upload images and videos, categorize them, and present them in an elegant gallery for visitors.

## Features
- **Admin Dashboard**: Secure access for admins to manage media content.
- **Image & Video Upload**: Upload and categorize media with ease.
- **User Authentication**: Secure login and password reset powered by Appwrite.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Fast & Scalable**: Built with Next.js for performance and scalability.

## Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Appwrite (Authentication, Database, Storage)
- **Storage**: Appwrite Storage (for images and videos)
- **Deployment**: Vercel (Frontend), Appwrite Cloud/Self-hosted (Backend)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended)
- Appwrite (Cloud account or self-hosted instance)

### Clone the Repository
```sh
git clone https://github.com/yourusername/photography-website.git
cd photography-website
```

### Install Dependencies
```sh
yarn install  # or npm install
```

### Configure Environment Variables
Create a `.env.local` file in the root directory and set up the following variables:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT=<your-appwrite-project-id>
NEXT_PUBLIC_APPWRITE_BUCKET=<your-storage-bucket-id>
NEXT_PUBLIC_APPWRITE_DATABASE=<your-database-id>
NEXT_PUBLIC_APPWRITE_COLLECTION=<your-collection-id>
```

### Run the Development Server
```sh
yarn dev  # or npm run dev
```
The application will be available at `http://localhost:3000`.

## Deployment
### Vercel Deployment
1. Push your code to GitHub/GitLab.
2. Connect your repository to Vercel.
3. Set up environment variables in Vercel.
4. Deploy!

## Future Enhancements
- **Tag-based search and filtering**
- **Bulk media upload**
- **Customizable gallery layouts**
- **AI-powered media categorization**

## Contributing
Feel free to fork this project and submit pull requests! Ensure you follow best practices and document changes properly.

## License
MIT License. See `LICENSE` for more details.

---