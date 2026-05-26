import type { UserDTO } from "../../entity/entity.interface.js";
import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class UpdateUserUseCase {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(userDto: UserDTO): Promise<void>{

        const user = await this.userRepository.findUserById(userDto.id);

        if(!user){
            throw new Error('User not found');
        }

        const updatedUser = {
            ...user,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password
        }

        await this.userRepository.updateUser(updatedUser);
    }
}