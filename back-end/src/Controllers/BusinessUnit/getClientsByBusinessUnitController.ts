import { Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'

const getClientsByBusinessUnitController = async (req: Request, res:Response) => {
    const businessUnitId = req.params.id

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('Erro ao buscar os clientes da unidade', 422)
    }

    const { clients } = await getClientsByBusinessUnit(businessUnitId)

    res.status(200).json({
        clients
    })
}

const getClientsByBusinessUnit = async (id) => {
    try {
        const clients = await prismaClient.businessUnit.findUnique({
            where: {
                id: id
            },
            include: {
                clients: true
            }
        })
        return clients
    } catch (error) {
        throw new CustomError('Erro ao buscar os clientes da unidade', 500)
    }
}

export { getClientsByBusinessUnitController }
