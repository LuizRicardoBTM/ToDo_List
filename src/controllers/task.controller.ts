import type { Request, Response } from "express";
import type { CreateTaskUseCase } from "../usecases/tasks/task.create.js";
import type { DeleteTaskUseCase } from "../usecases/tasks/task.delete.js";
import type { FindAllTasksUseCase } from "../usecases/tasks/task.find.all.js";
import type { FindTaskByIdUseCase } from "../usecases/tasks/task.find.by.id.js";
import type { UpdateTaskUseCase } from "../usecases/tasks/task.update.js";
import { TaskDto } from "../dto/task.dto.js";

export class TaskController {
    constructor(
        private createUseCase: CreateTaskUseCase,
        private deleteUseCase: DeleteTaskUseCase,
        private updateUseCase: UpdateTaskUseCase,
        private findByIdUseCase: FindTaskByIdUseCase,
        private findAllUseCase: FindAllTasksUseCase
    ){}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const dto = await TaskDto.createValidation(req.body);
            const userId = req.userId as string;
            
            if (dto.userId && dto.userId !== userId) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await this.createUseCase.execute(dto, userId);

            res.status(201).json({ message: 'New Task Created' });

        } catch(error) {

            res.status(500).json({ message: 'Error creating new task' });
        
        }
    }

    async delete(req: Request, res: Response): Promise<void>{
        try {
            const id = req.params.id as string;
            const userId = req.userId as string;

            await this.deleteUseCase.execute(id, userId);

            res.status(200).json({ message: 'Task deleted' });
        
        } catch (error) {

            if (error instanceof Error && error.message === 'Task not found') {
                res.status(404).json({ message: 'Task not found' });
                return;
            }
            
            res.status(500).json({ message: 'Error deleting the task' });
            
        }
    }

    async update(req: Request, res: Response): Promise<void>{
        try {
            const dto = await TaskDto.updateValidation(req.body);
            const userId = req.userId as string;

            if (dto.userId && dto.userId !== userId) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }

            await this.updateUseCase.execute(dto, userId);

            res.status(200).json({ message: 'Task updated' });

        } catch (error) {
            
            res.status(500).json({ message: 'Error updating the task' });

        }       
    }

    async findById(req: Request, res: Response): Promise<void>{
        try{

            const id = req.params.id as string;
            const userId = req.userId as string;

            const task = await this.findByIdUseCase.execute(id, userId)
            
            if (!task) {
                res.status(404).json({ message: 'Task not found' });
                return;
            }

            if (task?.userId !== userId) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }

            

            res.status(200).json({
                taskFound: task,
                message: 'Task found'
            });

        } catch (error) {
            
            res.status(500).json({ message: 'Error finding task' });

        }
    }

    async findAll(req: Request, res: Response): Promise<void>{
        try{

            const userId = req.userId as string;
            const tasks = await this.findAllUseCase.execute(userId)
            
            res.status(200).json({
                allTasks: tasks,
                message: 'Tasks found'
            });

        } catch (error) {
            
            res.status(500).json({ message: 'Error finding task' });

        }
    }
}