import { Request, Response } from 'express'
import { getEventByUniqueAttribute } from './utils/getEventByUniqueAttribute'
import { formatDates } from '../../helpers/formatDates'
import { prismaClient } from '../../database/prismaClient'

const getEventsByVehicleController = async (req: Request, res: Response) => {
    const vehicleId = req.params.id

    const events = await getEventsByVehicleId(vehicleId)

    events.map((event) => (event.occurrenceDateTime = formatDates(event.occurrenceDateTime) as any))

    res.status(200).json({
        events
    })
}

const getEventsByVehicleId = async (vehicleId) => {
    const events = await prismaClient.event.findMany({
        where: {
            vehicleId: vehicleId
        },
        include: {
            address: true,
            vehicle: true
        }
    })

    return events
}

export { getEventsByVehicleController }
