// import { PrismaClient } from '@prisma/client';
const { PrismaClient } = require('@prisma/client');

const seedData = [
    {
        title: "Task 1",
        description: "Task 1 description",
        status: "pending",
        date: "some date 1"
    },
    {
        title: "Task 2",
        description: "Task 2 description",
        status: "in-progress",
        date: "some date 2"
    },
    {
        title: "Task 3",
        description: "Task 3 description",
        status: "finished",
        date: "some date 3"
    },
];

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`)
    for (const t of seedData) {
        const task = await prisma.tasks.create({
            data: t,
        })
        console.log(`Created task with id: ${task.id}`)
    }
    console.log(`Seeding finished.`)
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