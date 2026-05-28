import { PrismaClient } from "../../prisma/database/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { TaskInterface } from "../entity/entity.interface.js";
import type { TaskRepositoryInterface } from "./repository.interface.js";
import { TaskEntity } from "../entity/task.entity.js";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

export class TaskRepository implements TaskRepositoryInterface{
    
    async createTask(task: TaskInterface, userId: string): Promise<void> {
        try{
            await prisma.task.create({
                data: {
                    id: task.id,
                    userId: userId,
                    title: task.title,
                    description: task.description,
                    createdAt: task.createdAt,
                    done: task.done,
                    dueDate: task.dueDate
                }
            })
        }
        catch (error){
            throw new Error("Couldn't create the task")
        }
    }

    async deleteTask(id: string, userId: string): Promise<void> {
        try{
            await prisma.task.delete({
                where: {id: id, userId: userId}
            })
        }
        catch{
            throw new Error("Couldn't delete the task")
        }
    }

    async updateTask(task: TaskInterface, userId: string): Promise<void> {
        try{
            await prisma.task.update({
                where: {id: task.id, userId: userId},
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

    async findTaskById(id: string, userId: string): Promise<TaskInterface | null> {
        try{
            const query = await prisma.task.findUnique({
                where: {id: id, userId: userId}
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

    async findAllTasks(userId: string): Promise<TaskInterface[]> {
        try{
            const query = await prisma.task.findMany({
                where: {userId: userId}
            })

            const tasks = query.map(task => new TaskEntity(task))
            return tasks;
        }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }
}