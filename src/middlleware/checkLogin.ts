import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";




export function checkLogin(req: Request, res: Response, next: NextFunction) {

    const JWT = req.headers.authorization
    const { id } = req.body
    if (!JWT) {
        return res.status(401).end()
    }

    const [bearer, token] = JWT.split(' ')

    try {
        const decodedToken = verify(token, process.env.JWT_KEY)
        return next()
    } catch (error) {
        return res.status(401).end()
    }

}