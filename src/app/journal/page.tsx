import JournalClient from "./JournalClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
    const posts = await prisma.journal.findMany({
        orderBy: { date: "desc" },
    });

    const settings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
    });

    return <JournalClient initialPosts={posts} settings={settings} />;
}
