import type { TaskDTO } from "../../entity/entity.interface.js";
import { TaskEntity } from "../../entity/task.entity.js";
import type { TaskRepositoryInterface } from "../../repository/repository.interface.js";
import { UserRepository } from "../../repository/user.repository.js";

export class CreateTaskUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface, 
        private userRepository: UserRepository 
    ){}

    async execute(taskDto: TaskDTO): Promise<void>{

        const user = await this.userRepository.findUserById(taskDto.userId);

        if (!user) {
            throw new Error('User not found');
        }

        const task = new TaskEntity(taskDto);

        await this.taskRepository.createTask(task)

    }
}