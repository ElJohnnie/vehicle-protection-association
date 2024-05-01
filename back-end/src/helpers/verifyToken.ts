import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { getToken } from './getToken'
import { NextFunction, Request, Response } from 'express'
import { CustomError } from './CustomError'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        throw new CustomError('Acesso negado', 401)
    }

    const token = getToken(req)

    if (!token) {
        throw new CustomError('Acesso negado', 401)
    }

    try {
        const verified = verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        throw new CustomError('Token inválido', 400)
    }
}

export { verifyToken }
