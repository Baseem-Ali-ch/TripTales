# 🌍 Trip Tales

Welcome to **Trip Tales**, your personal platform for sharing and discovering captivating travel blogs! This website empowers travel enthusiasts to document their adventures and connect with a vibrant community of explorers.

---

## 📑 Table of Contents

- [About Trip Tales](#about-trip-tales)
- [Features](#features)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)

---

## 📖 About Trip Tales

**Trip Tales** is a comprehensive travel blogging platform designed for ease of use and rich content creation. Whether you're a seasoned traveler or just beginning your journey, Trip Tales provides all the tools you need to chronicle your experiences, upload stunning photos, and share your unique perspectives with the world.

---

## ✨ Features

### 👤 User Features

- **Create Blogs** – Write and publish travel stories with a rich text editor.
- **Edit Blogs** – Update posts with new insights or corrections.
- **Read Blogs** – Browse and explore blogs from other travelers.
- **Delete Blogs** – Remove blogs if they are no longer needed.

### 🛠️ Admin Features

- **Manage Users** – Oversee user accounts, including registration and deletion.
- **Manage Blogs** – Moderate and control all blog content on the platform.
- **Manage Categories** – Create, update, and delete categories for organized content.

---

## 🧰 Technologies Used

- **Frontend Framework**: Next.js (with React)
- **Backend/API**: Next.js API Routes
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Image Hosting**: Cloudinary

---

## ⚙️ Setup and Installation

### 1. 📦 Clone the Repository

```bash
git clone https://github.com/Baseem-Ali-ch/TripTales.git
cd TripTales
2. 📁 Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. 🔐 Set Up Environment Variables
Create a .env file in the root directory and add the following variables. Replace placeholder values with your actual credentials:

env
Copy
Edit
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your_jwt_secret_key"

CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
Note:

DATABASE_URL: PostgreSQL connection string.

JWT_SECRET: Used for signing JSON Web Tokens.

Cloudinary credentials are available from your Cloudinary dashboard.

4. 🛠️ Database Migration
Generate the Prisma client and push schema changes to the database:

bash
Copy
Edit
npx prisma generate
npx prisma db push
(Optional: seed the database if you have a seed script.)

5. 🚀 Run the Development Server
bash
Copy
Edit
npm run dev
# or
yarn dev
Visit http://localhost:3000 in your browser to see Trip Tales in action.