import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_MB = 10;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const BUCKET_NAME = "project-images";

export async function POST(req: Request) {
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

        // Create a unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        console.log(`Uploading file to Supabase Storage: ${fileName} (${file.type}), size: ${file.size}`);

        const { data, error } = await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage error:", error);
            throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        console.log("Supabase Upload Success:", publicUrl);

        return NextResponse.json({ url: publicUrl });
    } catch (error: any) {
        console.error("Supabase Upload Exception:", error);
        return NextResponse.json(
            { error: error?.message || "Supabase upload failed" },
            { status: 500 }
        );
    }
}


