import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'USER', 'SUPERADMIN'];

  for (const name of roles) {
    await prisma.role.upsert({
      where: { name: name as any },
      update: {},
      create: { name: name as any },
    });
    console.log(`Seeded role: ${name}`);
  }

  console.log('✅ All roles seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
