import { Request, Response } from 'express'
import { IEditEvent } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'
import { parse } from 'date-fns'
import { regexZipCodeReplace } from '../../utils/mask'
import { getEventByUniqueAttribute } from './utils/getEventByUniqueAttribute'

const editEventController = async (req: Request, res: Response) => {
    const id = req.params.id

    const eventExists = await getEventByUniqueAttribute('id', id)

    if (!eventExists) {
        throw new CustomError('O evento informado não existe', 422)
    }

    const event = await updateEvent(req)

    res.status(200).json({
        event
    })
}

const updateEvent = async (req: Request) => {
    const id = req.params.id

    const {
        description, type, occurrenceDateTime, policeReport, address
    }:IEditEvent = req.body

    try {
        const event = await prismaClient.event.update({
            where: {
                id: id
            },
            data: {
                description: description,
                type: type,
                occurrenceDateTime: parse(occurrenceDateTime, 'dd/MM/yyyy', Date.now()),
                policeReport: policeReport,
                address: {
                    update: {
                        zipCode: regexZipCodeReplace(address.zipCode),
                        street: address.street,
                        complement: address.complement,
                        neighborhood: address.neighborhood,
                        city: address.city,
                        state: address.state
                    }
                }
            }
        })
        return event
    } catch (error) {
        throw new CustomError('Erro ao editar o evento', 500)
    }
}

export { editEventController }
