// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const data = await prisma.tasks.findMany();
    console.log(data);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })