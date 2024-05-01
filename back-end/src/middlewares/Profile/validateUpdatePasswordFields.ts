import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { IEditPasswordProfile, IEditPasswordUser } from '../../utils/interface'

const validateUpdatePasswordFields = async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword, confirmPassword }:IEditPasswordProfile = req.body
    if (!newPassword) {
        throw new CustomError('A senha é obrigatória', 422)
    } else if (!oldPassword) {
        throw new CustomError('A confirmação de senha é obrigatória', 422)
    } else if (!confirmPassword) {
        throw new CustomError('A confirmação de senha é obrigatória', 422)
    } else if (newPassword !== confirmPassword) {
        throw new CustomError('A confirmação de senha deve ser igual a senha', 422)
    }

    next()
}

export { validateUpdatePasswordFields }
