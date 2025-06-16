Trip Tales
Welcome to Trip Tales, your personal platform for sharing and discovering captivating travel blogs! This website is built to empower travel enthusiasts to document their adventures and connect with a community of fellow explorers.

Table of Contents
About Trip Tales

Features

Technologies Used

Setup and Installation

About Trip Tales
Trip Tales is a comprehensive travel blogging platform designed for ease of use and rich content creation. Whether you're a seasoned traveler or just starting your journey, Trip Tales provides the tools to chronicle your experiences, upload stunning photos, and share your unique perspectives with the world.

Features
User Features
Create Blogs: Write and publish your travel stories with rich text editing capabilities.

Edit Blogs: Update your existing blog posts to refine details or add new insights.

Read Blogs: Explore a wide array of travel blogs from other users.

Delete Blogs: Remove your blog posts if they are no longer relevant or desired.

Admin Features
Manage Users: Oversee user accounts, including registration and deletion.

Manage Blogs: Full control over all blog posts on the platform, allowing for content moderation and removal.

Manage Categories: Create, edit, and delete categories to organize blog content effectively.

Technologies Used
Frontend Framework: Next.js (with React)

Backend/API: Next.js API Routes

Language: TypeScript

Database ORM: Prisma

Styling: Tailwind CSS

Authentication: JWT (JSON Web Tokens)

Image Hosting: Cloudinary

Setup and Installation
To get Trip Tales up and running on your local machine, follow these steps:

Clone the Repository:

git clone git remote add origin https://github.com/Baseem-Ali-ch/TripTales.git
cd trip-tales

Install Dependencies:

npm install

# or

yarn install

Set Up Environment Variables:
Create a .env file in the root directory and add the following variables. Replace the placeholder values with your actual credentials.

DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your_jwt_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
NEXT_PUBLIC_APP_URL="app url"

DATABASE_URL: Your PostgreSQL database connection string.

JWT_SECRET: A strong, random string for signing JWTs.

Cloudinary credentials: Obtain these from your Cloudinary dashboard.

Database Migration:
Generate Prisma client and push the schema to your database:

npx prisma generate
npx prisma db push

Run the Development Server:

npm run dev

# or

yarn dev

Open http://localhost:3000 in your browser to see the application.
