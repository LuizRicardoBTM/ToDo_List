import type { UserDTO } from '../entity/entity.interface.js';

export class UserDto {
    id: string;
    name: string;
    email: string;
    password: string;

    constructor(data: UserDTO){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    static createValidation(data: UserDTO): UserDto {
        
        if (typeof data !== 'object' || data === null) {
            throw new Error('Request body must be an object');
        }

        const input = data as UserDTO;

        if (!input.id || typeof input.id !== 'string') {
            throw new Error('id is required and must be a string');
        }
        if (!input.name || typeof input.name !== 'string') {
            throw new Error('name is required and must be a string');
        }
        if (!input.email || typeof input.email !== 'string') {
            throw new Error('email is required and must be a string');
        }
        if (!input.password || typeof input.password !== 'string') {
            throw new Error('password is required and must be a string');
        }
        
        const dto = new UserDto(input as UserDTO);
        dto.id = input.id as string;
        dto.name = input.name as string;
        dto.email = input.email as string;
        dto.password = input.password as string;
        return dto;
    }

    static updateValidation(data: UserDTO): UserDto {
        
        if (typeof data !== 'object' || data === null) {
            throw new Error('Request body must be an object');
        }

        const input = data as UserDTO;

        if (typeof input.id !== 'string') {
            throw new Error('id must be a string');
        }
        if (typeof input.name !== 'string') {
            throw new Error('name must be a string');
        }
        if (typeof input.email !== 'string') {
            throw new Error('email must be a string');
        }
        if (typeof input.password !== 'string') {
            throw new Error('password must be a string');
        }
        const dto = new UserDto(input as UserDTO);
        dto.id = input.id as string;
        dto.name = input.name as string;
        dto.email = input.email as string;
        dto.password = input.password as string;
        return dto;
    }

}