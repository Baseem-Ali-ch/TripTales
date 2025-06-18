import { cloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Compress image using sharp
    const compressedBuffer = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    // Convert to base64
    const base64File = `data:${file.type};base64,${compressedBuffer.toString("base64")}`;

    // Upload to Cloudinary with transformation options
    const result = await cloudinary.uploader.upload(base64File, {
      folder: type === "cover" ? "TripTales/cover-photos" : "TripTales/profile-pictures",
      transformation: [
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}