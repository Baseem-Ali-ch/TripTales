export interface User {
  id: string; // Changed to string to match the UUID type in Prisma
  fullName: string;
  email: string;
  username: string; // Added to match the Prisma model
  password: string; // Added to match the Prisma model
  status: UserStatus; // Match enum values
  role: UserRole; // Match enum values
  verified: boolean; // Added to match the Prisma model
  lastLogin: Date | null; // Optional field
  coverPicture?: string; // Optional field
  profilePicture?: string; // Optional field
  bio?: string; // Optional field
  socialLinks?: SocialLink[]; // Assuming SocialLinks is defined elsewhere
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface SocialLink {
  id: string;
  type: string; // e.g., "twitter", "linkedin", etc.
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
type UserRole = "USER" | "ADMIN" | "READER" | "EDITOR" | "AUTHOR";
