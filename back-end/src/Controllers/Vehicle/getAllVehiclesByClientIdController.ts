import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { parseResTypeVehicle } from '../../utils/mask'

const getAllVehiclesByClientIdController = async (req: Request, res: Response) => {
    const clientId = req.params.clientId

    const vehicles = await findVehicleByClientId(clientId)

    vehicles.forEach((item) => {
        item.type = parseResTypeVehicle(item.type)
    })

    res.status(200).json({
        vehicles: vehicles
    })
}

const findVehicleByClientId = async (clientId: string) => {
    try {
        const vehicle = await prismaClient.vehicle.findMany({
            where: {
                clientId: clientId
            },
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
        return vehicle
    } catch (error) {
        throw new CustomError('Erro ao buscar os veículos do cliente', 500)
    }
}

export { getAllVehiclesByClientIdController }
