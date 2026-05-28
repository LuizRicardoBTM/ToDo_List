import { TaskController } from "../controllers/task.controller.js";
import { taskRouter } from "../routes/task.router.js";
import { TaskRepository } from "../repository/task.repository.js";
import { CreateTaskUseCase } from "../usecases/tasks/task.create.js";
import { DeleteTaskUseCase } from "../usecases/tasks/task.delete.js";
import { UpdateTaskUseCase } from "../usecases/tasks/task.update.js";
import { FindTaskByIdUseCase } from "../usecases/tasks/task.find.by.id.js";
import { FindAllTasksUseCase } from "../usecases/tasks/task.find.all.js";
import { UserRepository } from "../repository/user.repository.js";

const taskRepository = new TaskRepository();
const userRepository = new UserRepository();


const createTask = new CreateTaskUseCase(taskRepository, userRepository);
const deleteTask = new DeleteTaskUseCase(taskRepository);
const updateTask = new UpdateTaskUseCase(taskRepository, userRepository);
const findTaskById = new FindTaskByIdUseCase(taskRepository);
const findAllTasks = new FindAllTasksUseCase(taskRepository);


const taskController = new TaskController(createTask, deleteTask, updateTask, findTaskById, findAllTasks);

export const taskRouterInstance = taskRouter(taskController);