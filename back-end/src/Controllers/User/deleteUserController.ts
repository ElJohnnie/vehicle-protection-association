import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'

const deleteUserController = async (req: Request, res: Response) => {
    const id = req.params.id

    const user = await getUserByUniqueAttribute('id', id)

    if (!user) {
        throw new CustomError('O usuário que deseja deletar não existe na base de dados', 422)
    }

    await deleteUser(id)

    res.status(200).json({
        message: 'Sucesso ao deletar o usuário'
    })
}

const deleteUser = async (id: string) => {
    try {
        await prismaClient.user.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar o usuário', 500)
    }
}

export { deleteUserController }
