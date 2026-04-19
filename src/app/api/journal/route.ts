import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const entries = await prisma.journal.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch journal" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const entry = await prisma.journal.create({
            data: body,
        });
        return NextResponse.json(entry);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
