import { Task } from "@/store/store";
import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client');
// import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function PUT(request: Request) {
    const URL = request.url;
    const id = URL.split('/').pop() ?? null;
    const data = await request.json();

    if (!id || Object.keys(data).length === 0 || id.length !== 24) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400, statusText: "Bad Request" }
        );
    }
    if (data.status) {
        if (data.status !== "pending" && data.status !== "in-progress" && data.status !== "finished") {
            return NextResponse.json(
                { message: "Invalid status" },
                { status: 400, statusText: "Bad Request" }
            );
        }
    }
    try {
        await prisma.$connect();
        const existingTask: Task = await prisma.tasks.findUnique({ where: { id } });
        if (!existingTask) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404, statusText: "Not Found" }
            );
        }     
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
    
    const response = await updateTask(id, data);
    return NextResponse.json(
        { ...response },
        { status: 201, statusText: "DB updated" }
    );
}

const updateTask = async (id: string, data: { title?: string, description?: string, status?: string }) => {
    try {
        await prisma.$connect();
        const existingTask: Task = await prisma.tasks.findUnique({ where: { id } });
        await prisma.tasks.update(
            { 
                where: { id },
                data: {
                    title: data.title ?? existingTask.title,
                    description: data.description ?? existingTask.description,
                    status: data.status ?? existingTask.status,
                    date: Date.now().toString()
                } 
            }
        );
        return prisma.tasks.findUnique({ where: { id } });
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
};



// GET REQUEST
export async function GET(request: Request) {
    const URL = request.url;
    const id = URL.split('/').pop() ?? null;

    if (!id || id.length !== 24) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400, statusText: "Bad Request" }
        );
    }
    try {
        await prisma.$connect();
        const existingTask: Task = await prisma.tasks.findUnique({ where: { id } });
        if (!existingTask) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404, statusText: "Not Found" }
            );
        }
        return NextResponse.json(
            { ...existingTask },
            { status: 200, statusText: "OK" }
        );
        
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE REQUEST
export async function DELETE(request: Request) {
    const URL = request.url;
    const id = URL.split('/').pop() ?? null;

    if (!id || id.length !== 24) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400, statusText: "Bad Request" }
        );
    }
    try {
        await prisma.$connect();
        const response = await prisma.tasks.delete({ where: { id } });
        if (!response) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404, statusText: "Not Found" }
            );
        }
        return NextResponse.json(
            { ...response },
            { status: 200, statusText: "OK" }
        );
        
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}