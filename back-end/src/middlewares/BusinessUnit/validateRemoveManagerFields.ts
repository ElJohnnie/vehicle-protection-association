import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'

const validateRemoveManagerFields = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, businessUnitId } = req.body

    if (!userId) {
        throw new CustomError('O identificador do usuário é obrigatório', 422)
    } else if (!businessUnitId) {
        throw new CustomError('O identificador da unidade é obrigatório', 422)
    }

    next()
}

export { validateRemoveManagerFields }
