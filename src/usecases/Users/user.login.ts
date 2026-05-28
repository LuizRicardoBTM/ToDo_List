import type { UserRepositoryInterface } from "../../repository/repository.interface.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserPasswordValidator {
    constructor(
        private userRepository: UserRepositoryInterface
    ){}

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if(!bcrypt.compareSync(password, user.password)){
            throw new Error("Incorrect password");
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email }, 
            process.env.JWT_SECRET as string, 
            { expiresIn: '2h' }
        );

        return token;
    }

}    