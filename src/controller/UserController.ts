import { Request, Response } from "express";
import { prisma } from "../prisma";

class UserController {
    async create(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username) throw new Error('Nome de usuário não informado')


        if (!password) throw new Error('Senha não informada')


        const userAlreadyCreated = await prisma.user.findFirst({
            where: {
                username: username
            },
        })

        if (userAlreadyCreated) throw new Error('Este usário já está cadastrado')

        const user = await prisma.user.create({
            data: {
                username,
                password
            }
        })

        return res.json(user)

    }
}

export const userController = new UserController()