import type { TaskInterface } from "../entity/entity.interface.js";
import type TaskRepositoryInterface from "../repository/repository.interface.js";

export class FindTaskByIdUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(): Promise<TaskInterface[]>{
        
        return await this.taskRepository.findAll()
    }
}