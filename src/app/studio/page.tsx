import StudioClient from "./StudioClient";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
    let settings: any = null;
    try {
        // @ts-ignore
        if (prisma.siteSettings) {
            settings = await prisma.siteSettings.findUnique({
                where: { id: "global" },
            });
        }
    } catch (e) {
        console.error(e);
    }

    return <StudioClient settings={settings} />;
}
