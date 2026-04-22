import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const upcoming = await prisma.upcomingProject.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(upcoming);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const project = await prisma.upcomingProject.create({
            data: body
        });
        return NextResponse.json(project);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
