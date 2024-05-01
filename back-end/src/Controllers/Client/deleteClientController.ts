import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { deleteClientPayController } from '../GalaxyPay/Client/deleteClientPayController'
import { getClientByUniqueAttribute } from './utils/getClientByUniqueAttribute'

const deleteClientController = async (req: Request, res: Response) => {
    const id = req.params.id

    const client = await getClientByUniqueAttribute('id', id)

    if (!client) {
        throw new CustomError('O cliente que deseja excluir não existe na base de dados', 422)
    }

    await deleteClientGalaxyPay(id)

    await deleteClient(id)

    res.status(200).json({
        message: 'Sucesso ao excluir o cliente'
    })
}

const deleteClient = async (id: string) => {
    try {
        const clientDelete = await prismaClient.client.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar o cliente', 500)
    }
}

const deleteClientGalaxyPay = async (id: string) => {
    try {
        const response = await deleteClientPayController(
            id
        )

        if (!response.status.includes(200, 209)) {
            throw new CustomError('Erro ao excluir o cliente na plataforma galaxy pay', 500)
        }
    } catch (error) {
        throw new CustomError('Erro ao excluir o cliente na plataforma galaxy pay', 500)
    }
}

export { deleteClientController }
