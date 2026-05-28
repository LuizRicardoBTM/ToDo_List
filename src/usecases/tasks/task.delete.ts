import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class DeleteTaskUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface
     ){}

    async execute(id: string, userId: string): Promise<void>{
        
        await this.taskRepository.deleteTask(id, userId)

    }
}