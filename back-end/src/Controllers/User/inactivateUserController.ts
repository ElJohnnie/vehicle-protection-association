import { Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'

const inactivateUserController = async (req: Request, res: Response) => {
    const id = req.params.id

    const user = await getUserByUniqueAttribute('id', id)

    if (!user) {
        throw new CustomError('O usuário que deseja inativar não existe na base de dados', 422)
    }

    if (!user.isActive) {
        throw new CustomError('O usuário que deseja inativar já encontra-se inativo', 422)
    }

    await inactivateUser(req)

    res.status(200).json({
        message: 'Sucesso ao inativar o usuário'
    })
}

const inactivateUser = async (req) => {
    const id = req.params.id

    try {
        await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao inativar o usuário', 500)
    }
}
export { inactivateUserController }
