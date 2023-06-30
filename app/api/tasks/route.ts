import { Task } from "@/store/store";
import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from '@prisma/client';

export async function GET() {
    const tasks = await getTasks();
    return NextResponse.json(
        tasks,
        { status: 200, statusText: "Success" }
    );
}

export async function POST(request: Request) {
    const requestData: {title: string, description: string} = await request.json();
    const task: Task = {
        title: requestData.title,
        description: requestData.description,
        status: "pending",
        date: Date.now().toString()
    };
    await postTask(task);
    return NextResponse.json(
        { ...task },
        { status: 201, statusText: "Added to DB" }
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

const postTask = async (task: Task) => {
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        await prisma.tasks.create({ data: task });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};

