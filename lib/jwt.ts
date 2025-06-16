import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);
export async function verifyToken(token: string) {
  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as {
      userId: string;
      email: string;
      username: string;
    };
  } catch (err) {
    return null;
  }
}
