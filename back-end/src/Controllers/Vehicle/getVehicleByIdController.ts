import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getVehicleByUniqueAttribute } from './utils/getVehicleByUniqueAttribute'
import { parseResTypeVehicle } from '../../utils/mask'

const getVehicleByIdController = async (req: Request, res: Response) => {
    const id = req.params.id

    const vehicle = await getVehicleByUniqueAttribute('id', id)

    if (vehicle) { vehicle.type = parseResTypeVehicle(vehicle.type) }

    res.status(200).json(
        vehicle
    )
}

export { getVehicleByIdController }
