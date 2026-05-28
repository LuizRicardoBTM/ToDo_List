import type { UserDTO } from "../../entity/entity.interface.js";
import { UserEntity } from "../../entity/user.entity.js";
import type { UserRepositoryInterface } from "../../repository/repository.interface.js";

export class UpdateUserUseCase {
    constructor( private userRepository: UserRepositoryInterface ){}

    async execute(userDto: UserDTO): Promise<void>{

        const user = await this.userRepository.findUserById(userDto.id);

        if(!user){
            throw new Error('User not found');
        }

        const updatedUser = new UserEntity({
            id: user.id,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password
        });

        await this.userRepository.updateUser(updatedUser);
    }
}