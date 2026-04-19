import IndexClient from "./IndexClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
    let mapped: any[] = [];
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
        console.error("DB connection failed:", e);
    }
    return <IndexClient initialProjects={mapped} />;
}
