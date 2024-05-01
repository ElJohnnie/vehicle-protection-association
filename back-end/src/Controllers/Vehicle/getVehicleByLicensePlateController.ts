import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getVehicleByUniqueAttribute } from './utils/getVehicleByUniqueAttribute'
import { parseResTypeVehicle } from '../../utils/mask'

const getVehicleByLicensePlateController = async (req: Request, res: Response) => {
    const licensePlate = req.params.licensePlate

    const vehicle = await getVehicleByUniqueAttribute('licensePlate', licensePlate)

    if (vehicle) { vehicle.type = parseResTypeVehicle(vehicle.type) }

    res.status(200).json({
        vehicle
    })
}

export { getVehicleByLicensePlateController }
