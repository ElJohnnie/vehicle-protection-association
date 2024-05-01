import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'

const getAllEventsController = async (req: Request, res: Response) => {
    const events = await findAllEvents()

    res.status(200).json({
        events
    })
}

const findAllEvents = async () => {
    try {
        const events = await prismaClient.event.findMany({
            include: {
                address: true,
                vehicle: true
            }
        })
        return events
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os clientes', 500)
    }
}

export { getAllEventsController }
