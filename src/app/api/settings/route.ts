import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: "global" },
        });
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "global" },
            });
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const settings = await prisma.siteSettings.update({
            where: { id: "global" },
            data: body,
        });
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
