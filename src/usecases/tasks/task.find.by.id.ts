import type { TaskInterface } from "../../entity/entity.interface.js";
import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";

export class FindTaskByIdUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface
     ){}

    async execute(id: string, userId: string): Promise<TaskInterface | null>{
         
        return await this.taskRepository.findTaskById(id, userId)
   
    }
}