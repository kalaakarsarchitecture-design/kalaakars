import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.project.delete({
    where: { id: "8fb003f1-124c-4ac0-848d-dcf97f8a7bd3" }
  });
  console.log("Deleted test local project.");
}

main().finally(() => prisma.$disconnect());
