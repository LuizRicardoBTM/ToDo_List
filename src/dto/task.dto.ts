import type { TaskDTO } from '../entity/entity.interface.js';
export class TaskDto {
    id: string;
    title: string;
    description: string;
    createdAt?: Date;
    done?: boolean;
    dueDate: Date;

    constructor(data: TaskDTO){
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.createdAt = data.createdAt || new Date();
        this.done = data.done ?? false;
        this.dueDate = data.dueDate;
    }

    static createValidation(data: TaskDTO): TaskDto {
        
        if (typeof data !== 'object' || data === null) {
            throw new Error('Request body must be an object');
        }

        const input = data as TaskDTO;

        if (!input.id || typeof input.id !== 'string') {
            throw new Error('id is required and must be a string');
        }
        if (!input.title || typeof input.title !== 'string') {
            throw new Error('title is required and must be a string');
        }
        if (!input.description || typeof input.description !== 'string') {
            throw new Error('description is required and must be a string');
        }
        if (input.done !== undefined && typeof input.done !== 'boolean') {
            throw new Error('done must be a boolean if provided');
        }
        const parsedDueDate = new Date(input.dueDate as unknown as string);
        if (!input.dueDate || isNaN(parsedDueDate.getTime())) {
            throw new Error('dueDate is required and must be a valid date string');
        }
        
        const dto = new TaskDto(input as TaskDTO);
        dto.id = input.id as string;
        dto.title = input.title as string;
        dto.description = input.description as string;
        dto.createdAt = input.createdAt as Date ?? new Date();
        dto.done = input.done ?? false;
        dto.dueDate = parsedDueDate;
        return dto;
    }

    static updateValidation(data: TaskDTO): TaskDto {
        
        if (typeof data !== 'object' || data === null) {
            throw new Error('Request body must be an object');
        }

        const input = data as TaskDTO;

        if (typeof input.id !== 'string') {
            throw new Error('id must be a string');
        }
        if (typeof input.title !== 'string') {
            throw new Error('title must be a string');
        }
        if (typeof input.description !== 'string') {
            throw new Error('description must be a string');
        }
        if (input.done !== undefined && typeof input.done !== 'boolean') {
            throw new Error('done must be a boolean if provided');
        }
        const parsedDueDate = new Date(input.dueDate as unknown as string);
        if (!input.dueDate || isNaN(parsedDueDate.getTime())) {
            throw new Error('dueDate is required and must be a valid date string');
        }
        
        const dto = new TaskDto(input as TaskDTO);
        dto.id = input.id as string;
        dto.title = input.title as string;
        dto.description = input.description as string;
        dto.done = input.done as boolean;
        dto.dueDate = parsedDueDate;
        return dto;
    }

}