import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class DeleteTaskUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface
     ){}

    async execute(id: string, userId: string): Promise<void>{
        
        const task = await this.taskRepository.findTaskById(id, userId)

        if (!task) {
            throw new Error("Task not found")
        }

        await this.taskRepository.deleteTask(id, userId)

    }
}