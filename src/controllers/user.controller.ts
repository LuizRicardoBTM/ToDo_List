import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../usecases/users/user.create.js";
import type { DeleteUserUseCase } from "../usecases/users/user.delete.js";
import type { FindAllUsersUseCase } from "../usecases/users/user.find.all.js";
import type { FindUserByIdUseCase } from "../usecases/users/user.find.by.id.js";
import type { UpdateUserUseCase } from "../usecases/users/user.update.js";
import { UserDto } from "../dto/user.dto.js";

export class UserController {
    constructor(
        private createUseCase: CreateUserUseCase,
        private deleteUseCase: DeleteUserUseCase,
        private updateUseCase: UpdateUserUseCase,
        private findByIdUseCase: FindUserByIdUseCase,
        private findAllUseCase: FindAllUsersUseCase
        
    ){}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const dto = UserDto.createValidation(req.body);
            
            await this.createUseCase.execute(dto);

            res.status(201).json({ message: 'New User Created' });

        } catch(error) {

            res.status(500).json({ message: 'Error creating new user' });
        
        }
    }

    async delete(req: Request, res: Response): Promise<void>{
        try {
            const id = req.params.id as string;

            await this.deleteUseCase.execute(id);

            res.status(200).json({ message: 'User deleted' });
        
        } catch (error) {

            res.status(500).json({ message: 'Error deleting the user' });
            
        }
    }

    async update(req: Request, res: Response): Promise<void>{
        try {
            const dto = UserDto.updateValidation(req.body);

            await this.updateUseCase.execute(dto);

            res.status(200).json({ message: 'User updated' });

        } catch (error) {
            
            res.status(500).json({ message: 'Error updating the user' });

        }       
    }

    async findById(req: Request, res: Response): Promise<void>{
        try{

            const id = req.params.id as string;

            const user = await this.findByIdUseCase.execute(id)

            res.status(200).json({ 
                userFound: user,
                message: 'User found'
            });

        } catch (error) {
            
            res.status(500).json({ message: 'Error finding user' });

        }
    }

    async findAll(req: Request, res: Response): Promise<void>{
        try{

            const user = await this.findAllUseCase.execute()

            res.status(200).json({
                allUsers: user,
                message: 'Users found'
            });

        } catch (error) {
            
            res.status(500).json({ message: 'Error finding users' });

        }
    }
}