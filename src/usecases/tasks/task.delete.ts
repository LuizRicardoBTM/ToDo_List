import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class DeleteTaskUseCase {
    constructor( private taskRepository: TaskRepositoryInterface ){}

    async execute(id: string): Promise<void>{
        
        await this.taskRepository.deleteTask(id)

    }
}