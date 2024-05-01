import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'

const getAllBusinessUnitsController = async (req: Request, res: Response) => {
    const businessUnits = await findAllBusinessUnits()

    res.status(200).json({
        businessUnits
    })
}

const findAllBusinessUnits = async () => {
    try {
        const businessUnits = await prismaClient.businessUnit.findMany({
            select: {
                id: true,
                documentNumber: true,
                corporateName: true,
                createdAt: true,
                updatedAt: true,
                managers: true,
                users: true
            }
        })
        return businessUnits
    } catch (error) {
        throw new CustomError('Erro ao buscar todos as unidades', 500)
    }
}

export { getAllBusinessUnitsController }
