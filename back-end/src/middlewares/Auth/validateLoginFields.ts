import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { ILogin } from '../../utils/interface'

const validateLoginFields = (req: Request, res:Response, next:NextFunction) => {
    const { email, password }:ILogin = req.body

    if (!email) {
        throw new CustomError('O e-mail é obrigatório', 422)
    } else if (!password) {
        throw new CustomError('A senha é obrigatória', 422)
    }

    next()
}

export { validateLoginFields }
