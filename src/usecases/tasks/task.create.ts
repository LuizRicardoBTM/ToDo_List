import type { TaskDTO } from "../../entity/entity.interface.js";
import { TaskEntity } from "../../entity/task.entity.js";
import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class CreateTaskUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(taskDto: TaskDTO): Promise<void>{

        const task = new TaskEntity(taskDto);

        await this.taskRepository.createTask(task)

    }
}