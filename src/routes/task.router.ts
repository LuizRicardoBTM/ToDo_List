import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";

export function taskRouter(controller: TaskController): Router {
    const router = Router();
    
    router.post('/', controller.create.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));
    router.get('/:id', controller.findById.bind(controller));
    router.get('/', controller.findAll.bind(controller));
    
    return router;
}