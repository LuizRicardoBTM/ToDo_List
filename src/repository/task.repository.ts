import { PrismaClient } from "../../prisma/database/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { TaskInterface } from "../entity/entity.interface.js";
import type TaskRepositoryInterface from "./repository.interface.js";
import { TaskEntity } from "../entity/task.entity.js";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

class TaskRepository implements TaskRepositoryInterface{
    
    async create(task: TaskInterface): Promise<void> {
        await prisma.task.create({
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                createdAt: task.createdAt,
                done: task.done,
                dueDate: task.dueDate
            }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.task.delete({
            where: {id: id}
        })
        
    }

    async update(task: TaskInterface): Promise<void> {
        await prisma.task.update({
            where: {id: task.id},
            data: {
                title: task.title,
                description: task.description,
                priority: task.priority,
                createdAt: task.createdAt,
                done: task.done,
                dueDate: task.dueDate
            }
        })
        
    }

    async findById(id: string): Promise<TaskEntity | null> {
        const query = await prisma.task.findUnique({
            where: {id: id}
        })

        if (!query) {
            return null;
        }

        const task = new TaskEntity(query)
        return task;
    }

    async findAll(): Promise<TaskInterface[]> {
        const query = await prisma.task.findMany({})

        const task = new TaskEntity(query)
        return task;
    }
}