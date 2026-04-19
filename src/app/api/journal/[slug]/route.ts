import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const entry = await prisma.journal.findUnique({
            where: { slug },
        });
        if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const body = await req.json();
        const entry = await prisma.journal.update({
            where: { slug },
            data: body,
        });
        return NextResponse.json(entry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        await prisma.journal.delete({
            where: { slug },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
