import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        let isValid = false;
        let userId = "fallback";

        // Fallback login for first setup
        if (password === (process.env.ADMIN_SECRET || "kalaakars-admin-2026") && (!username || username === "admin")) {
            isValid = true;
        } else {
            // DB Login
            if (!username) return NextResponse.json({ error: "Username required" }, { status: 400 });
            const user = await prisma.adminUser.findUnique({ where: { username } });
            if (user) {
                isValid = await bcrypt.compare(password, user.password);
                if (isValid) userId = user.id;
            }
        }

        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = await signToken({ userId, username: username || "admin" });
        const cookieStore = await cookies();
        
        cookieStore.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
