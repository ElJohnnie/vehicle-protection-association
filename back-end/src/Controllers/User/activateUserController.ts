import { Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'

const activateUserController = async (req: Request, res: Response) => {
    const id = req.params.id

    const user = await getUserByUniqueAttribute('id', id)

    if (!user) {
        throw new CustomError('O usuário que deseja ativar não existe na base de dados', 422)
    }

    if (user.isActive) {
        throw new CustomError('O usuário que deseja ativar já encontra-se ativo', 422)
    }

    await activateUser(req)

    res.status(200).json({
        message: 'Sucesso ao ativar o usuário'
    })
}

const activateUser = async (req) => {
    const id = req.params.id

    try {
        await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                isActive: true
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao ativar o usuário', 500)
    }
}
export { activateUserController }
