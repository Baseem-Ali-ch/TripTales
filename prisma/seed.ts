const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt')

const prisma = new PrismaClient();

async function main() {

    const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || '';
    const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD || '';


  //? Check if the admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await prisma.user.create({
      data: {
        fullName: 'Super Admin',
        email: ADMIN_EMAIL,
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN',
        status: 'ACTIVE',
        verified: true
      },
    });

    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
