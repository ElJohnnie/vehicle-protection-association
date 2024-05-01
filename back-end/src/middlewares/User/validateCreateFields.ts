import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { Role } from '../../utils/enum'
import { ICreateUser } from '../../utils/interface'
import { regexDocumentNumberValidate } from '../../utils/mask'

const validateCreateFields = (req: Request, res: Response, next: NextFunction) => {
    const { fullname, email, documentNumber, password, confirmPassword, role, unitsIds }:ICreateUser = req.body

    if (!fullname) {
        throw new CustomError('O nome completo é obrigatório', 422)
    } else if (!email) {
        throw new CustomError('O e-mail é obrigatório', 422)
    } else if (!documentNumber) {
        throw new CustomError('O número do documento é obrigatório', 422)
    } else if (!regexDocumentNumberValidate(documentNumber)) {
        throw new CustomError('O número do documento é inválido', 422)
    } else if (!role) {
        throw new CustomError('O nível do usuário é obrigatório', 422)
    } else if (!password) {
        throw new CustomError('A senha é obrigatória', 422)
    } else if (!confirmPassword) {
        throw new CustomError('A confirmação de senha é obrigatória', 422)
    } else if (password !== confirmPassword) {
        throw new CustomError('A confirmação de senha deve ser igual a senha', 422)
    } else if (!Object.values(Role).includes(role)) {
        throw new CustomError('O nível informado não existe', 422)
    } else if (!unitsIds || unitsIds.length === 0) {
        throw new CustomError('As unidades que o usuário irá ser alocado devem ser informadas', 422)
    }

    next()
}

export { validateCreateFields }
