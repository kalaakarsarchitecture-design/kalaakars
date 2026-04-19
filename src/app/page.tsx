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

    const settings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
    });

    return <HomeClient initialProjects={mapped} initialSettings={settings} />;
}
