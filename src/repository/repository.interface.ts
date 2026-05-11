import type { TaskInterface } from "../entity/entity.interface.js";
import type BaseInterface from "../entity/entity.interface.js";

export default interface TaskRepository {
    create(task: BaseInterface): Promise<void>;
    update(task: BaseInterface): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<TaskInterface | null>;
    findAll(): Promise<TaskInterface[]>
}