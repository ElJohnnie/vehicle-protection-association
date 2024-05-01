import { Request, Response } from 'express'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'

const activateClientController = async (req:Request, res: Response) => {
    const id = req.params.id

    const client = await getClientByUniqueAttribute('id', id)

    if (!client) {
        throw new CustomError('O cliente que deseja ativar não existe na base de dados', 422)
    }

    if (client.isActive) {
        throw new CustomError('O cliente que deseja ativar já encontra-se ativo', 422)
    }

    await inactivateClient(id)

    res.status(200).json({
        message: 'Sucesso ao ativar o cliente'
    })
}

const inactivateClient = async (id) => {
    try {
        await prismaClient.client.update({
            where: {
                id: id
            },
            data: {
                isActive: true
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao ativar o client', 500)
    }
}

export { activateClientController }
