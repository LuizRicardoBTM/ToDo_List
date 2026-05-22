import 'dotenv/config';
import express from "express";
import { TaskController } from "./controllers/task.controller.js";
import { taskRouter } from "./routes/task.router.js";
import { TaskRepository } from "./repository/task.repository.js";
import { CreateTaskUseCase } from "./usecases/task.create.js";
import { DeleteTaskUseCase } from "./usecases/task.delete.js";
import { UpdateTaskUseCase } from "./usecases/task.update.js";
import { FindTaskByIdUseCase } from "./usecases/task.find.by.id.js";
import { FindAllTasksUseCase } from "./usecases/task.find.all.js";

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