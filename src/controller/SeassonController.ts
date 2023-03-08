import { Request, Response } from "express";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";


class SeasonController {
    async show(req: Request, res: Response) {
        const { username, password } = req.body

        if (!username || !password) throw new Error('Informe o nome de usuário e a senha')

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })


        if (!user) throw new Error('Usuário não existe')

        if (String(user.password) != String(password)) throw new Error('Nome de usuário ou senha incorreta')


        const token = sign({ username: user?.username }, process.env.JWT_KEY, { subject: user.id });

        return res.json({ username: user.username, id: user.id, token: token })
    }
}


export const seasonController = new SeasonController()