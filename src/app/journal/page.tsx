import JournalClient from "./JournalClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
    let posts: any[] = [];
    let settings: any = null;

    try {
        posts = await prisma.journal.findMany({
            orderBy: { date: "desc" },
        });

        // @ts-ignore
        if (prisma.siteSettings) {
            settings = await prisma.siteSettings.findUnique({
                where: { id: "global" },
            });
        }
    } catch (e) {
        console.error(e);
    }

    return <JournalClient initialPosts={posts} settings={settings} />;
}
