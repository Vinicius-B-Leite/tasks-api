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
        const status = req.query.status as string


        const userExists = await prisma.user.findFirst({
            where: {
                id: userID,
            }
        })

        if (!userExists) throw new Error('Usuário não existe')

        const tasks = await prisma.tasks.findMany({
            where: {
                userID: userID,
                status: status
            }
        })

        return res.json(tasks)
    }

    async update(req: Request, res: Response) {
        const { title, description, status, taksID } = req.body

        if (!taksID) throw new Error('Informe o id da tarefa')

        const taksExists = await prisma.tasks.findFirst({ where: { id: taksID } })

        if (!taksExists) throw new Error('Crie uma tarefa antes de a atualizar')


        const task = await prisma.tasks.update({
            data: {
                titile: title || taksExists.titile,
                description: description || taksExists.description,
                status: status || taksExists.status,
                userID: taksExists.userID,
            },
            where: {
                id: taksID
            }
        })

        return res.json(task)

    }

    async delete(req: Request, res: Response) {
        const { taskID } = req.params

        if (!taskID) throw new Error('Informe um ID de uma tarefa para deletar')

        const taskExist = await prisma.tasks.findFirst({ where: { id: taskID } })
        if (!taskExist) throw new Error('Informe um id válido')


        await prisma.tasks.delete({
            where: {
                id: taskID
            }
        })

        return res.json({ message: 'tarefa deletada' })
    }
}


export const taskController = new TaskController()