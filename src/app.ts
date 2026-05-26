import 'dotenv/config';
import express from "express";
import { TaskController } from "./controllers/task.controller.js";
import { taskRouter } from "./routes/task.router.js";
import { TaskRepository } from "./repository/task.repository.js";
import { CreateTaskUseCase } from "./usecases/tasks/task.create.js";
import { DeleteTaskUseCase } from "./usecases/tasks/task.delete.js";
import { UpdateTaskUseCase } from "./usecases/tasks/task.update.js";
import { FindTaskByIdUseCase } from "./usecases/tasks/task.find.by.id.js";
import { FindAllTasksUseCase } from "./usecases/tasks/task.find.all.js";
import { UserController } from "./controllers/user.controller.js";
import { userRouter } from "./routes/user.router.js";
import { UserRepository } from "./repository/user.repository.js";
import { CreateUserUseCase } from './usecases/users/user.create.js';
import { DeleteUserUseCase } from './usecases/users/user.delete.js';
import { UpdateUserUseCase } from './usecases/users/user.update.js';
import { FindUserByIdUseCase } from './usecases/users/user.find.by.id.js';
import { FindAllUsersUseCase } from './usecases/users/user.find.all.js';


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const repository = new TaskRepository();
const createTask = new CreateTaskUseCase(repository);
const deleteTask = new DeleteTaskUseCase(repository);
const updateTask = new UpdateTaskUseCase(repository);
const findTaskById = new FindTaskByIdUseCase(repository);
const findAllTasks = new FindAllTasksUseCase(repository);


const taskController = new TaskController(createTask, deleteTask, updateTask, findTaskById, findAllTasks);

const taskRouterInstance = taskRouter(taskController);

app.use("/tasks", taskRouterInstance);


const userRepository = new UserRepository();
const createUser = new CreateUserUseCase(userRepository);
const deleteUser = new DeleteUserUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository);
const findUserById = new FindUserByIdUseCase(userRepository);
const findAllUsers = new FindAllUsersUseCase(userRepository);

const userController = new UserController(createUser, deleteUser, updateUser, findUserById, findAllUsers);
const userRouterInstance = userRouter(userController);

app.use("/users", userRouterInstance);


app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});