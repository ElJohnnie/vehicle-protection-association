import { NextFunction, Request, Response } from 'express'
import { Role } from '../utils/enum'
import { CustomError } from './CustomError'
import { getToken } from './getToken'
import { getUserByToken } from './getUserByToken'

const verifyRoles = (roles: Role[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const isValidRole = roles.includes(Role[user.role])

        if (!isValidRole) {
            throw new CustomError('Acesso negado, sem permissão para utilizar este recurso', 401)
        }

        next()
    }
}

export { verifyRoles }
