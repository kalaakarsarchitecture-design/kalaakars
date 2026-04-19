import ProjectsClient from "./ProjectsClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
    let projectList: any[] = [];
    let settings = null;

    try {
        projectList = await prisma.project.findMany({
            orderBy: { num: "asc" },
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

    return <ProjectsClient initialProjects={projectList} settings={settings} />;
}
