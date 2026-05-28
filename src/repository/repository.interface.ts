import type { TaskInterface, UserInterface } from "../entity/entity.interface.js";

export interface TaskRepositoryInterface {
    createTask(task: TaskInterface, userId: string): Promise<void>;
    updateTask(task: TaskInterface, userId: string): Promise<void>;
    deleteTask(id: string, userId: string): Promise<void>;
    findTaskById(id: string, userId: string): Promise<TaskInterface | null>;
    findAllTasks(userId: string): Promise<TaskInterface[]>
}

export interface UserRepositoryInterface {
    createUser(user: UserInterface): Promise<void>;
    updateUser(user: UserInterface): Promise<void>;
    deleteUser(id: string): Promise<void>;
    findUserById(id: string): Promise<UserInterface | null>;
    findAllUsers(): Promise<UserInterface[]>
    findUserByEmail(email: string): Promise<UserInterface | null>;
}