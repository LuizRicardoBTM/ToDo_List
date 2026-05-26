import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class DeleteUserUseCase   {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(id: string): Promise<void>{
        
        await this.userRepository.deleteUser(id)

    }
}