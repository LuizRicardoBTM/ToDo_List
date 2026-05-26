import type { UserDTO } from "../../entity/entity.interface.js";
import { UserEntity } from "../../entity/user.entity.js";
import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class CreateUserUseCase {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(userDto: UserDTO): Promise<void>{

        const user = new UserEntity(userDto);

        await this.userRepository.createUser(user)

    }
}