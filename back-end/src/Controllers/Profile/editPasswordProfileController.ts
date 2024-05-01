import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { encryptPassword } from '../../helpers/encriptyPassword'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { compare } from 'bcrypt'

const editPasswordProfileController = async (req: Request, res: Response) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    const token = getToken(req)
    const profile = await getUserByToken(token)

    const checkPassword = await compare(oldPassword, profile.password)

    if (!checkPassword) {
        throw new CustomError('A senha atual informada não corresponde com a senha cadastrada', 422)
    }

    const encryptedPass = await encryptPassword(newPassword)

    await updatePassword(req, encryptedPass, profile.id)

    res.status(200).json({
        message: 'Senha atualizada com sucesso'
    })
}

const updatePassword = async (req: Request, password: string, id: string) => {
    try {
        await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                password: password
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao atualizar a senha do usuário', 500)
    }
}

export { editPasswordProfileController }
