import { Router, Request, Response } from "express";
import { seasonController } from "./controller/SeassonController";
import { taskController } from "./controller/TaskController";
import { userController } from "./controller/UserController";
import { checkLogin } from "./middlleware/checkLogin";


const routes = Router()

routes.post('/user', userController.create)
routes.post('/login', seasonController.show)

routes.post('/task', checkLogin, taskController.create)
routes.get('/tasks/:userID', checkLogin, taskController.show)
routes.put('/tasks/', checkLogin, taskController.update)
routes.delete('/tasks/:taskID', checkLogin, taskController.delete)

export default routes