import { Request, Response, response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'

const getAllClientsController = async (req: Request, res: Response) => {
    const clients = await findAllClients()

    res.status(200).json({
        clients
    })
}

const findAllClients = async () => {
    try {
        const clients = await prismaClient.client.findMany({
            select: {
                id: true,
                documentNumber: true,
                fullname: true,
                email: true,
                telephone: true,
                mobilephone: true,
                indication: true,
                address: true,
                identityDocument: true,
                licenseDocument: true,
                createdAt: true,
                updatedAt: true
            }
        })
        return clients
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os clientes', 500)
    }
}

export { getAllClientsController }
