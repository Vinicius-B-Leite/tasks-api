import { Request, Response } from "express";
import { prisma } from "../prisma";

class TaskController {
    async create(req: Request, res: Response) {
        const { userID, title, description } = req.body

        if (!userID || !title || !description) throw new Error('Informe todos os dados')

        const task = await prisma.tasks.create({
            data: {
                titile: title,
                description: description,
                userID: userID,
            }
        })

        return res.json(task)
    }

    async show(req: Request, res: Response) {
        const { userID } = req.params

        const userExists = await prisma.user.findFirst({ where: { id: userID } })

        if (!userExists) throw new Error('Usuário não existe')

        const tasks = await prisma.tasks.findMany({
            where: {
                userID: userID
            }
        })

        return res.json(tasks)
    }

    async update(req: Request, res: Response) {
        const { userID, title, description, status, taksID } = req.body

        if (!taksID) throw new Error('Informe o id da tarefa')

        const taksExists = await prisma.tasks.findFirst({ where: { id: taksID } })

        if (!taksExists) throw new Error('Crie uma tarefa antes de a atualizar')

        const task = await prisma.tasks.update({
            data: {
                titile: title,
                description: description,
                status: status,
                userID: userID,
            },
            where: {
                id: taksID
            }
        })

        //refletir dps sobre a lógica dessa parte

    }
}


export const taskController = new TaskController()