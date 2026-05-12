import type { TaskInterface } from "../entity/entity.interface.js";

export default interface TaskRepository {
    create(task: TaskInterface): Promise<void>;
    update(task: TaskInterface): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<TaskInterface | null>;
    findAll(): Promise<TaskInterface[]>
}