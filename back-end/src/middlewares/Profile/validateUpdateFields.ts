import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { Role } from '../../utils/enum'
import { ICreateUser, IEditProfile } from '../../utils/interface'

const validateUpdateFields = (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, documentNumber, role }:IEditProfile = req.body

    if (!fullname) {
        throw new CustomError('O nome completo é obrigatório', 422)
    } else if (!email) {
        throw new CustomError('O e-mail é obrigatório', 422)
    } else if (!documentNumber) {
        throw new CustomError('O número do documento é obrigatório', 422)
    } else if (!role) {
        throw new CustomError('O nível do usuário é obrigatório', 422)
    } else if (!Object.values(Role).includes(role)) {
        throw new CustomError('O nível informado não existe', 422)
    }

    next()
}

export { validateUpdateFields }
