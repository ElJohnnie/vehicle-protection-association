import { Request, Response } from 'express'
import { getEventByUniqueAttribute } from './utils/getEventByUniqueAttribute'
import { formatDates } from '../../helpers/formatDates'

const getEventByIdController = async (req: Request, res: Response) => {
    const id = req.params.id

    const event = await getEventByUniqueAttribute('id', id)

    event.occurrenceDateTime = formatDates(event.occurrenceDateTime) as any

    res.status(200).json({
        event
    })
}

export { getEventByIdController }
