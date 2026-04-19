import HomeClient from "./HomeClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
    let mapped: any[] = [];
    let settings = null;

    try {
        const projects = await prisma.project.findMany({
            include: { gallery: true, specs: true },
            orderBy: { num: "asc" },
        });

        mapped = projects.map(p => ({
            ...p,
            hero_img: p.heroImg,
            pull_quote: p.pullQuote,
        }));
    } catch (e) {
        console.error("DB connection failed — serving empty state:", e);
    }

    try {
        // @ts-ignore
        if (prisma.siteSettings) {
            settings = await prisma.siteSettings.findUnique({
                where: { id: "global" },
            });
        }
    } catch (e) {
        console.error("Settings fetch failed:", e);
    }

    return <HomeClient initialProjects={mapped} initialSettings={settings} />;
}
