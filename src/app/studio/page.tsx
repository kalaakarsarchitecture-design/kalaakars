import StudioClient from "./StudioClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
    const settings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
    });

    return <StudioClient settings={settings} />;
}
