import { UserController } from "../controllers/user.controller.js";
import { userRouter } from "../routes/user.router.js";
import { UserRepository } from "../repository/user.repository.js";
import { CreateUserUseCase } from '../usecases/users/user.create.js';
import { DeleteUserUseCase } from '../usecases/users/user.delete.js';
import { UpdateUserUseCase } from '../usecases/users/user.update.js';
import { FindUserByIdUseCase } from '../usecases/users/user.find.by.id.js';
import { FindAllUsersUseCase } from '../usecases/users/user.find.all.js';
import { UserPasswordValidator } from '../usecases/users/user.login.js';

const userRepository = new UserRepository();
const userPasswordValidator = new UserPasswordValidator(userRepository);


const createUser = new CreateUserUseCase(userRepository);
const deleteUser = new DeleteUserUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository);
const findUserById = new FindUserByIdUseCase(userRepository);
const findAllUsers = new FindAllUsersUseCase(userRepository);

const userController = new UserController(createUser, deleteUser, updateUser, findUserById, findAllUsers, userPasswordValidator);

export const userRouterInstance = userRouter(userController);