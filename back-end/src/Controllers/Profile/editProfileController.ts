import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { IEditUser } from '../../utils/interface'
import { getUserByUniqueAttribute } from '../User/utils/getUserByUniqueAttribute'
import { excludeFieldUser } from '../User/utils/excludeFieldUser'
import { regexDocumentNumberReplace } from '../../utils/mask'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'

const editProfileController = async (req: Request, res: Response) => {
    const { email, documentNumber }: IEditUser = req.body

    const token = getToken(req)
    const profile = await getUserByToken(token)

    if (email !== profile.email) {
        const emailExists = await getUserByUniqueAttribute('email', email)
        if (emailExists) {
            throw new CustomError('O e-mail informado já encontra-se cadastrado no sistema', 422)
        }
    }

    if (regexDocumentNumberReplace(documentNumber) !== profile.documentNumber) {
        const documentNumberExists = await getUserByUniqueAttribute('documentNumber', regexDocumentNumberReplace(documentNumber))
        if (documentNumberExists) {
            throw new CustomError('O número do documento informado  já encontra-se cadastrado no sistema', 422)
        }
    }

    const profileUpdate = excludeFieldUser(await updateProfile(req, profile.id), ['password'])

    res.status(200).json({
        user: profileUpdate
    })
}

const updateProfile = async (req: Request, id: string) => {
    const { fullname, email, documentNumber } = req.body

    try {
        const profile = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                fullname: fullname,
                email: email,
                documentNumber: regexDocumentNumberReplace(documentNumber)
            }
        })
        return profile
    } catch (error) {
        throw new CustomError('Erro ao editar o perfil', 500)
    }
}

export { editProfileController }
