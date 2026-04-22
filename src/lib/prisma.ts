import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var __prisma: PrismaClient | undefined;
}

const prisma = global.__prisma ?? new PrismaClient();

// Note: If deploying to Vercel, ensure the DATABASE_URL environment variable 
// in the Vercel dashboard is set to the direct URL if the pooler connection string is not working.

if (process.env.NODE_ENV !== "production") {
    global.__prisma = prisma;
}

export default prisma;
