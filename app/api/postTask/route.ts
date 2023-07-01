import { Task } from "@/store/store";
import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
    const requestData: {title: string, description: string} = await request.json();

    if (!requestData.title || !requestData.description) {
        return NextResponse.json(
            { error: "Missing title or description" },
            { status: 400, statusText: "Bad Request" }
        );
    }

    const task: Task = {
        title: requestData.title,
        description: requestData.description,
        status: "pending",
        date: Date.now().toString()
    };
    const taskWithId = await postTask(task);
    return NextResponse.json(
        { ...taskWithId },
        { status: 201, statusText: "Added to DB" }
    );
}

const postTask = async (task: Task) => {
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        await prisma.tasks.create({ data: task });
        const taskWithId = await prisma.tasks.findUnique({ where: { title: task.title } });
        return taskWithId;
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};