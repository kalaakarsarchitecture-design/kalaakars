import ProjectClient from "./ProjectClient";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    try {
        const project = await prisma.project.findUnique({
            where: { slug: id },
            include: { gallery: true, specs: true },
        });

        if (!project) return notFound();

        let nextProject = await prisma.project.findFirst({
            where: { num: { gt: project.num } },
            orderBy: { num: "asc" },
        });

        if (!nextProject) {
            nextProject = await prisma.project.findFirst({
                orderBy: { num: "asc" },
            });
        }

        const mappedProject = {
            ...project,
            heroImg: project.heroImg,
            hero_img: project.heroImg,
            pullQuote: project.pullQuote,
        };

        const mappedNext = nextProject
            ? { ...nextProject, heroImg: nextProject.heroImg }
            : mappedProject;

        return <ProjectClient project={mappedProject} nextProject={mappedNext} />;
    } catch (e) {
        console.error("DB error on project page:", e);
        return notFound();
    }
}
