import type { TaskDTO } from "../../entity/entity.interface.js";
import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class UpdateTaskUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(taskDto: TaskDTO): Promise<void>{

        const task = await this.taskRepository.findTaskById(taskDto.id);

        if(!task){
            throw new Error('Task not found');
        }

        const updatedTask = {
            ...task,
            title: taskDto.title,
            description: taskDto.description,
            done: taskDto.done ?? task.done,
            dueDate: taskDto.dueDate
        }

        await this.taskRepository.updateTask(updatedTask);
    }
}