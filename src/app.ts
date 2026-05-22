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


app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`);
});