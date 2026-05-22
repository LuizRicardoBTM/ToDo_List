import type { TaskInterface } from "../entity/entity.interface.js";
import type TaskRepositoryInterface from "../repository/repository.interface.js";

export class FindAllTasksUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(): Promise<TaskInterface[]>{
        
        const tasks = await this.taskRepository.findAll()

        const priorityOrder = {
            "high": 0,
            "medium": 1,
            "low": 2
        };

        const sortedTasks = tasks.sort((a, b) => {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        return sortedTasks;
    }
}