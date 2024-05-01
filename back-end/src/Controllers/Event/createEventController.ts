import { Request, Response } from 'express'
import { ICreateEvent } from '../../utils/interface'
import { getVehicleByUniqueAttribute } from '../Vehicle/utils/getVehicleByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'
import { parse } from 'date-fns'
import { regexZipCodeReplace } from '../../utils/mask'

const createEventController = async (req: Request, res: Response) => {
    const { vehicleId }:ICreateEvent = req.body

    const vehicleExists = await getVehicleByUniqueAttribute('id', vehicleId)

    if (!vehicleExists) {
        throw new CustomError('O veículo informado não existe', 422)
    }

    const event = await saveEvent(req)

    res.status(201).json({
        event
    })
}

const saveEvent = async (req: Request) => {
    const {
        description, type, occurrenceDateTime, policeReport, address, vehicleId
    }:ICreateEvent = req.body

    try {
        const event = await prismaClient.event.create({
            data: {
                description: description,
                type: type,
                occurrenceDateTime: parse(occurrenceDateTime, 'dd/MM/yyyy', Date.now()),
                policeReport: policeReport,
                address: {
                    create: {
                        zipCode: regexZipCodeReplace(address.zipCode),
                        street: address.street,
                        complement: address.complement,
                        neighborhood: address.neighborhood,
                        city: address.city,
                        state: address.state
                    }
                },
                vehicle: {
                    connect: {
                        id: vehicleId
                    }
                }
            }
        })
        return event
    } catch (error) {
        throw new CustomError('Erro ao cadastrar o evento', 500)
    }
}

export { createEventController }
