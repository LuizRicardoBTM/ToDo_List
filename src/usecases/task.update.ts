import type { TaskInput } from "../entity/entity.interface.js";
import { TaskEntity } from "../entity/task.entity.js";
import type TaskRepositoryInterface from "../repository/repository.interface.js";

export class UpdateTaskUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(taskInput: TaskInput): Promise<void>{
        const task = new TaskEntity(taskInput);

        await this.taskRepository.update(task)

    }
}