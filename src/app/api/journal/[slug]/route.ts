import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const entry = await prisma.journal.findUnique({
            where: { slug: params.slug },
        });
        if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
    try {
        const body = await req.json();
        const entry = await prisma.journal.update({
            where: { slug: params.slug },
            data: body,
        });
        return NextResponse.json(entry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    try {
        await prisma.journal.delete({
            where: { slug: params.slug },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
