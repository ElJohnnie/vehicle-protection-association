import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { parseResTypeVehicle } from '../../utils/mask'

const getAllVehiclesController = async (req: Request, res: Response) => {
    const vehicles = await findAllVehicles()

    vehicles.forEach((item) => {
        item.type = parseResTypeVehicle(item.type)
    })

    res.status(200).json({
        vehicles
    })
}

const findAllVehicles = async () => {
    try {
        const vehicles = await prismaClient.vehicle.findMany({
            include: {
                client: {
                    include: {
                        licenseDocument: true
                    }
                },
                vehicleConditions: true,
                contract: true,
                events: true,
                secondDriver: {
                    include: {
                        licenseDocument: true
                    }
                }
            }
        })
        return vehicles
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os veículos', 500)
    }
}

export { getAllVehiclesController }
