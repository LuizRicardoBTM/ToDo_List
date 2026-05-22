import type { Request, Response } from "express";
import type { CreateTaskUseCase } from "../usecases/task.create.js";
import type { DeleteTaskUseCase } from "../usecases/task.delete.js";
import type { FindAllTasksUseCase } from "../usecases/task.find.all.js";
import type { FindTaskByIdUseCase } from "../usecases/task.find.by.id.js";
import type { UpdateTaskUseCase } from "../usecases/task.update.js";
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
        console.log('CREATE REACHED:', JSON.stringify(req.body));
        try {
            const dto = TaskDto.createValidation(req.body);
            
            await this.createUseCase.execute(dto);

            res.status(201).json({ message: 'New Task Created' });

        } catch(error) {

            console.log('Controller error: ', error);
            res.status(500).json({ message: 'Error creating new task' });
        
        }
    }

    async delete(req: Request, res: Response): Promise<void>{
        try {
            const id = req.params.id as string;

            await this.deleteUseCase.execute(id);

            res.status(200).json({ message: 'Task deleted' });
        
        } catch (error) {

            res.status(500).json({ message: 'Error deleting the task' });
            
        }
    }

    async update(req: Request, res: Response): Promise<void>{
        try {
            const dto = TaskDto.updateValidation(req.body);

            await this.updateUseCase.execute(dto);

            res.status(200).json({ message: 'Task updated' });

        } catch (error) {
            
            res.status(500).json({ message: 'Error updating the task' });

        }       
    }

    async findById(req: Request, res: Response): Promise<void>{
        try{

            const id = req.params.id as string;

            const task = await this.findByIdUseCase.execute(id)

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

            const task = await this.findAllUseCase.execute()

            res.status(200).json({
                allTasks: task,
                message: 'Task found'
            });

        } catch (error) {
            
            res.status(500).json({ message: 'Error finding task' });

        }
    }
}