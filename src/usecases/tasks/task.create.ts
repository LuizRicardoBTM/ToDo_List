import type { TaskDTO } from "../../entity/entity.interface.js";
import { TaskEntity } from "../../entity/task.entity.js";
import type { TaskRepositoryInterface, UserRepositoryInterface } from "../../repository/repository.interface.js";

export class CreateTaskUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface, 
        private userRepository: UserRepositoryInterface
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