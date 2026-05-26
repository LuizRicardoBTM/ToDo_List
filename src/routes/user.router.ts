import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export function userRouter(controller: UserController): Router {
    const router = Router();
    
    router.post('/', controller.create.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.delete.bind(controller));
    router.get('/:id', controller.findById.bind(controller));
    router.get('/', controller.findAll.bind(controller));
    
    return router;
}