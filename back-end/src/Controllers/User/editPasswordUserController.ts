import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { IEditPasswordUser } from '../../utils/interface'
import { encryptPassword } from '../../helpers/encriptyPassword'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'

const editPasswordUserController = async (req: Request, res: Response) => {
    const { password, confirmPassword }: IEditPasswordUser = req.body
    const id = req.params.id
    const user = await getUserByUniqueAttribute('id', id)

    if (!user) {
        throw new CustomError('O usuário que deseja atualizar a senha não existe na base de dados', 422)
    }

    const encryptedPass = await encryptPassword(password)

    await updatePassword(req, encryptedPass)

    res.status(200).json({
        message: 'Senha atualizada com sucesso'
    })
}

const updatePassword = async (req: Request, password: string) => {
    const id = req.params.id
    try {
        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                password: password
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao atualizar a senha do usuário', 500)
    }
}

export { editPasswordUserController }
