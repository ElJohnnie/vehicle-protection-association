import { Request, Response } from 'express'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'

const inactivateClientController = async (req: Request, res: Response) => {
    const id = req.params.id

    const client = await getClientByUniqueAttribute('id', id)

    if (!client) {
        throw new CustomError('O cliente que deseja inativar não existe na base de dados', 422)
    }

    if (!client.isActive) {
        throw new CustomError('O cliente que deseja inativar já encontra-se inativo', 422)
    }

    await inactivateClient(id)

    res.status(200).json({
        message: 'Sucesso ao inativar o cliente'
    })
}

const inactivateClient = async (id) => {
    try {
        await prismaClient.client.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao inativar o client', 500)
    }
}

export { inactivateClientController }
