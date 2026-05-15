import { PrismaClient } from "../../prisma/database/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { TaskInterface } from "../entity/entity.interface.js";
import type TaskRepositoryInterface from "./repository.interface.js";
import { TaskEntity } from "../entity/task.entity.js";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

export class TaskRepository implements TaskRepositoryInterface{
    
    async create(task: TaskInterface): Promise<void> {
        try{
            await prisma.task.create({
                data: {
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                    done: task.done,
                    dueDate: task.dueDate
                }
            })
        }
        catch{
            throw new Error("Couldn't create the task")
        }
    }

    async delete(id: string): Promise<void> {
        try{
            await prisma.task.delete({
                where: {id: id}
            })
        }
        catch{
            throw new Error("Couldn't delete the task")
        }
    }

    async update(task: TaskInterface): Promise<void> {
        try{    
            await prisma.task.update({
                where: {id: task.id},
                data: {
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                    done: task.done,
                    dueDate: task.dueDate
                }
            })
        }
        catch{
            throw new Error("Couldn't update the task")
        }
    }

    async findById(id: string): Promise<TaskEntity | null> {
        try{
            const query = await prisma.task.findUnique({
                where: {id: id}
            })

            if (!query) {
                return null;
            }

            const task = new TaskEntity(query)
            
            return task;
            }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }

    async findAll(): Promise<TaskInterface[]> {
        try{
            const query = await prisma.task.findMany({})

            const tasks = query.map(task => new TaskEntity(task))
            return tasks;
        }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }
}