import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export function taskRouter(controller: TaskController): Router {
    const router = Router();
    
    router.post('/tasks', controller.create.bind(controller));
    router.put('/tasks/:id', controller.update.bind(controller));
    router.delete('/tasks/:id', controller.delete.bind(controller));
    router.get('/tasks/:id', controller.findById.bind(controller));
    router.get('/tasks', controller.findAll.bind(controller));
    
    return router;
}