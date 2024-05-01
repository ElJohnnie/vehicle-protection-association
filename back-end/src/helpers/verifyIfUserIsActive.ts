import { NextFunction, Request, Response } from 'express'
import { getToken } from './getToken'
import { getUserByToken } from './getUserByToken'
import { CustomError } from './CustomError'

const verifyIfUserIsActive = async (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (!user.isActive) {
        throw new CustomError('Sem permissão para executar este tipo de tarefa, usuário inativo', 401)
    }

    next()
}

export { verifyIfUserIsActive }
