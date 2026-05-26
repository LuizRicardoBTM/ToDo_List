import type { UserInterface } from "../../entity/entity.interface.js";
import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class FindUserByIdUseCase {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(id: string): Promise<UserInterface | null>{
        
        return await this.userRepository.findUserById(id)
    }
}