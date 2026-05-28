import type { TaskDTO } from "../../entity/entity.interface.js";
import { TaskEntity } from "../../entity/task.entity.js";
import type { TaskRepositoryInterface, UserRepositoryInterface } from "../../repository/repository.interface.js";

export class UpdateTaskUseCase {
    constructor( 
        private taskRepository: TaskRepositoryInterface, 
        private userRepository: UserRepositoryInterface
    ){}

    async execute(taskDto: TaskDTO, userId: string): Promise<void>{

        const task = await this.taskRepository.findTaskById(taskDto.id, userId);

        if(!task){
            throw new Error('Task not found');
        }

        const user = await this.userRepository.findUserById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (task.userId !== userId) {
            throw new Error('Unauthorized');
        }

        const updatedTask = new TaskEntity({
            id: task.id,
            userId: task.userId,
            title: taskDto.title,
            description: taskDto.description,
            done: taskDto.done ?? task.done,
            dueDate: taskDto.dueDate
        });

        await this.taskRepository.updateTask(updatedTask, userId);
    }
}