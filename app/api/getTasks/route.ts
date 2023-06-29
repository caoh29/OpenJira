import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from '@prisma/client';

export async function GET(request: Request) {
    const tasks = await getTasks();
    return NextResponse.json(
        tasks,
        { status: 200, statusText: "Success" }
    );
}

const getTasks = async () => {
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        return await prisma.tasks.findMany();
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};

