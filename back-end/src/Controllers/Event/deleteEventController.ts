import { Request, Response } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { getEventByUniqueAttribute } from './utils/getEventByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'

const deleteEventController = async (req: Request, res: Response) => {
    const id = req.params.id

    const eventExists = await getEventByUniqueAttribute('id', id)

    if (!eventExists) {
        throw new CustomError('O evento informado não existe', 422)
    }

    await deleteEvent(req)

    res.status(200).json({
        message: 'Evento excluido com sucesso'
    })
}

const deleteEvent = async (req: Request) => {
    const id = req.params.id

    try {
        await prismaClient.event.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao editar o evento', 500)
    }
}

export { deleteEventController }
