import { PrismaClient } from "../../prisma/database/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import type { UserInterface } from "../entity/entity.interface.js";
import type { UserRepositoryInterface } from "./repository.interface.js";
import { UserEntity } from "../entity/user.entity.js";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL
})

const prisma = new PrismaClient({adapter});

export class UserRepository implements UserRepositoryInterface{
    
    async createUser(user: UserInterface): Promise<void> {
        try{
            await prisma.user.create({
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    password: user.password
                }
            })
        }
        catch (error){
            throw new Error("Couldn't create the user")
        }
    }

    async deleteUser(id: string): Promise<void> {
        try{
            await prisma.user.delete({
                where: {id: id}
            })
        }
        catch{
            throw new Error("Couldn't delete the user")
        }
    }

    async updateUser(user: UserInterface): Promise<void> {
        try{    
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    email: user.email,
                    name: user.name,
                    password: user.password,
                }
            })
        }
        catch{
            throw new Error("Couldn't update the user")
        }
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        try{
            const query = await prisma.user.findUnique({
                where: {id: id}
            })

            if (!query) {
                return null;
            }

            const user = new UserEntity(query)
            
            return user;
            }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }

    async findAllUsers(): Promise<UserEntity[]> {
        try{
            const query = await prisma.user.findMany({})

            const users = query.map(user => new UserEntity(user))
            return users;
        }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }

    async findUserByEmail(email: string): Promise<UserEntity | null> {
        try{
            const query = await prisma.user.findUnique({
                where: {email: email}
            })

            if (!query) {
                return null;
            }

            const user = new UserEntity(query)
            
            return user;
        }
        catch{
            throw new Error("Couldn't connect to the database")
        }
    }
}