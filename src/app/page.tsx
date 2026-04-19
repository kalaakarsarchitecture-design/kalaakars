import HomeClient from "./HomeClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
    const projects = await prisma.project.findMany({
        include: { gallery: true, specs: true },
        orderBy: { num: "asc" },
    });

    // Map to the format the frontend components expect (camelCase handling)
    const mapped = projects.map(p => ({
        ...p,
        hero_img: p.heroImg,
        pull_quote: p.pullQuote,
    }));

    let settings = null;
    try {
        // @ts-ignore - Handle delay in Prisma Client regeneration
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
