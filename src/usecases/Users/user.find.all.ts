import type { UserInterface } from "../../entity/entity.interface.js";
import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class FindAllUsersUseCase {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(): Promise<UserInterface[]>{
        
        const users = await this.userRepository.findAllUsers()

        return users;
    }
}