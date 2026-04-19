import ProjectsClient from "./ProjectsClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { num: "asc" },
    });

    const settings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
    });

    return <ProjectsClient initialProjects={projects} settings={settings} />;
}
