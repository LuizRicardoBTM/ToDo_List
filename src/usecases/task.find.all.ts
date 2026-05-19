import type { TaskInterface } from "../entity/entity.interface.js";
import type TaskRepositoryInterface from "../repository/repository.interface.js";

export class FindAllTasksUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(): Promise<TaskInterface[]>{
        
        return await this.taskRepository.findAll()
    }
}