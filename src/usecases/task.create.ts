import type { TaskInput } from "../entity/entity.interface.js";
import { TaskEntity } from "../entity/task.entity.js";
import type TaskRepositoryInterface from "../repository/repository.interface.js";

export class CreateTaskUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(taskInput: TaskInput): Promise<void>{
        const task = { ...taskInput, createdAt: new Date(), done: false}

        const assembledTask = new TaskEntity(task);

        await this.taskRepository.create(assembledTask)

    }
}