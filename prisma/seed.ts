const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Clear existing
    await prisma.spec.deleteMany();
    await prisma.galleryImage.deleteMany();
    await prisma.project.deleteMany();

    console.log("Seeding premium Kalaakars projects...");

    const p1 = await prisma.project.create({
        data: {
            slug: "the-serene-resort-wayanad",
            num: "01",
            title: "Serene Ridge Resort",
            subtitle: "A classic retreat nestled in the hills of Wayanad, blending vernacular Kerala architecture with modern luxury.",
            category: "Resort",
            location: "Wayanad",
            year: "2023",
            heroImg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000",
            story: "The Serene Ridge project was an exercise in mountain-side intervention. We utilized local laterite stone and traditional timber joinery to create a structure that breathes with the mist of Wayanad. Each cottage is oriented to capture the valley views while ensuring complete privacy through strategic landscape placement.",
            pullQuote: "Style and comfort find a perfect union amidst the tropical mist.",
            specs: {
                create: [
                    { label: "Built Area", value: "12,000 SQ.FT" },
                    { label: "Materiality", value: "Laterite & Timber" },
                    { label: "Landscape", value: "Tropical Mountain" },
                    { label: "Completion", value: "14 Months" }
                ]
            },
            gallery: {
                create: [
                    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200", span: "half" },
                    { src: "https://images.unsplash.com/photo-1449156001437-3a1621acda2e?q=80&w=1200", span: "half" },
                    { src: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2000", span: "full" }
                ]
            }
        }
    });

    const p2 = await prisma.project.create({
        data: {
            slug: "modern-minimalist-villa-malappuram",
            num: "02",
            title: "The Craftwork House",
            subtitle: "A residential masterpiece in Malappuram, showcasing our expertise in precise interior craftwork and modern structural honesty.",
            category: "Residential",
            location: "Malappuram",
            year: "2024",
            heroImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
            story: "For the Craftwork House, the client requested a space that was both a haven of comfort and a showcase of artisan skill. We worked with master carpenters to create bespoke interior systems where every joint is visible and celebrated. The concrete frame is softened by warm lights and rich teak textures.",
            pullQuote: "Precision in joinery, creativity in flow.",
            specs: {
                create: [
                    { label: "Client", value: "Private Resident" },
                    { label: "Duration", value: "18 Months" },
                    { label: "Craftwork", value: "Hand-finished Teak" },
                    { label: "Feature", value: "Double Height Atrium" }
                ]
            },
            gallery: {
                create: [
                    { src: "https://images.unsplash.com/photo-1600607687940-467f4b63528b?q=80&w=1200", span: "full" },
                    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200", span: "half" },
                    { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200", span: "half" }
                ]
            }
        }
    });

    const p3 = await prisma.project.create({
        data: {
            slug: "heritage-revival-resort",
            num: "03",
            title: "Malabar Heritage Resort",
            subtitle: "Restoration and expansion of a classic Kerala heritage property, reimagined for contemporary wellness.",
            category: "Resort",
            location: "Kozhikode",
            year: "2022",
            heroImg: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2000",
            story: "This project required a delicate touch. The original 40-year-old structures were preserved while modern pavilion-style extensions were added for public amenities. We balanced the heavy weight of traditional roofs with the light transparency of large glass openings.",
            pullQuote: "Where history breathes through modern glass.",
            specs: {
                create: [
                    { label: "Type", value: "Heritage Restoration" },
                    { label: "Rooms", value: "24 Luxury Keys" },
                    { label: "Material", value: "Laterite & Stone" },
                    { label: "Status", value: "Operational" }
                ]
            },
            gallery: {
                create: [
                    { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200", span: "half" },
                    { src: "https://images.unsplash.com/photo-1513584684374-8bdb7483fe8f?q=80&w=1200", span: "half" }
                ]
            }
        }
    });

    const p4 = await prisma.project.create({
        data: {
            slug: "contemporary-commercial-hub",
            num: "04",
            title: "The Nexus Workspace",
            subtitle: "A modern commercial environment in Areekode, designed for creative focus and community interaction.",
            category: "Commercial",
            location: "Areekode",
            year: "2023",
            heroImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000",
            story: "In a rapidly developing region, we wanted to set a benchmark for commercial design that prioritizes natural light and social corridors. The building layout is designed around a central 'street' that encourages cross-talk between different business hubs.",
            pullQuote: "Designing the corridors of progress.",
            specs: {
                create: [
                    { label: "Built Area", value: "45,000 SQ.FT" },
                    { label: "Facade", value: "Kinetic Louvers" },
                    { label: "Energy", value: "Solar Passive" },
                    { label: "Year", value: "2023" }
                ]
            },
            gallery: {
                create: [
                    { src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1200", span: "full" }
                ]
            }
        }
    });

    // ── JOURNAL SEED ──
    console.log("Seeding architectural journal entries...");
    await prisma.journal.deleteMany();
    await prisma.journal.createMany({
        data: [
            {
                slug: "vernacular-vs-modern",
                title: "Vernacular vs. Modern: The Malabar Balance",
                category: "Essays",
                date: "March 12, 2024",
                image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=1200",
                summary: "Exploring the tension and harmony between traditional Kerala building techniques and modern structural minimalism.",
                content: "The Kerala monsoon is perhaps the greatest architect of our land. It dictates the slope of our roofs, the placement of our courtyards, and the choice of our timber..."
            },
            {
                slug: "materials-that-breath",
                title: "Laterite: Materials That Breathe with the Earth",
                category: "Materials",
                date: "February 15, 2024",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
                summary: "A deep dive into why laterite remains the most sustainable and structurally honest choice for South Indian architecture.",
                content: "Laterite, the red earth that hardens upon exposure to air, has been the foundation of Malabar's architecture for centuries..."
            }
        ]
    });

    // ── SITE SETTINGS SEED ──
    console.log("Seeding global site configuration...");
    await prisma.siteSettings.upsert({
        where: { id: "global" },
        update: {},
        create: {
            id: "global",
            companyName: "Kalaakars Architecture",
            phone: "+91 7306358793",
            email: "kalaakaarsarchitecture@gmail.com",
            address: "Opposite Hill Fort Auditorium Gate, Pathanapuram, Areekode, Malappuram",
            instagram: "https://instagram.com/kalaakaars_architecture",
            linkedin: "https://linkedin.com/company/kalaakaars-architecture",
            yearsExp: "8"
        }
    });

    console.log("Seeding complete ✓");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
