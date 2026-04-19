import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

const MAX_MB = 10;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

export async function POST(req: Request) {
    // Configure Cloudinary inside the handler to ensure environment variables are loaded
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
    });

    let formData: FormData;
    try {
        formData = await req.formData();
    } catch (e) {
        console.error("Form data parsing error:", e);
        return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;

    if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure Cloudinary is actually configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name") {
        console.error("Cloudinary config missing. Found:", process.env.CLOUDINARY_CLOUD_NAME);
        return NextResponse.json(
            { error: "Cloudinary is not configured in .env.local yet." },
            { status: 500 }
        );
    }

    // Validate type
    if (!ALLOWED.includes(file.type)) {
        return NextResponse.json(
            { error: `Unsupported file type (${file.type}). Allowed: JPEG, PNG, WebP, GIF, AVIF` },
            { status: 415 }
        );
    }

    // Validate size
    if (file.size > MAX_MB * 1024 * 1024) {
        return NextResponse.json(
            { error: `File too large. Maximum size is ${MAX_MB} MB.` },
            { status: 413 }
        );
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Promise wrapper for Cloudinary stream upload
        const uploadToCloudinary = () => {
            return new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "kalaakars",
                        resource_type: "auto", // Allow automatic detection of resource type
                        format: "webp", 
                        quality: "auto",
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary stream error:", error);
                            reject(error);
                        } else if (!result) {
                            reject(new Error("Cloudinary upload resulted in empty response"));
                        } else {
                            resolve(result);
                        }
                    }
                );

                uploadStream.end(buffer);
            });
        };

        console.log(`Uploading file to Cloudinary: ${file.name} (${file.type}), size: ${file.size}`);
        const uploadResult = await uploadToCloudinary();
        console.log("Cloudinary Upload Success:", uploadResult.secure_url);

        return NextResponse.json({ url: uploadResult.secure_url });
    } catch (error: any) {
        console.error("Cloudinary Upload Exception:", error);
        return NextResponse.json(
            { error: error?.message || (typeof error === 'string' ? error : "Cloudinary upload failed") },
            { status: 500 }
        );
    }
}

