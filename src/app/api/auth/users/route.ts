import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getSession } from "@/lib/auth";

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const users = await prisma.adminUser.findMany({
        select: { id: true, username: true, createdAt: true }
    });
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { username, password } = await req.json();
        if (!username || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.adminUser.create({
            data: { username, password: hashed },
            select: { id: true, username: true }
        });
        return NextResponse.json(user);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
