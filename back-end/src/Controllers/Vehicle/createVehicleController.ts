import { Request, Response } from 'express'
import { ICreateVehicle } from '../../utils/interface'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getVehicleByUniqueAttribute } from './utils/getVehicleByUniqueAttribute'
import { parse } from 'date-fns'
import { regexDocumentNumberReplace, parseTypeVehicle, parseResTypeVehicle, regexValueMoneyNumberReplace } from '../../utils/mask'
import { Fuel } from '../../utils/enum'
import { getKeyByEnum } from '../../helpers/getKeysByEnum'
import { getClientByUniqueAttribute } from '../Client/utils/getClientByUniqueAttribute'

const createVehicleController = async (req: Request, res: Response) => {
    const { licensePlate, renavam, chassi, clientId }: ICreateVehicle = req.body

    const licensePlateExists = await getVehicleByUniqueAttribute('licensePlate', licensePlate)

    if (licensePlateExists) {
        throw new CustomError('A placa do veículo informado já encontra-se cadastrada no sistema', 422)
    }

    const chassiExists = await getVehicleByUniqueAttribute('chassi', chassi)

    if (chassiExists) {
        throw new CustomError('O chassi do veículo informado já encontra-se cadastrada no sistema', 422)
    }

    const renavamExists = await getVehicleByUniqueAttribute('renavam', renavam)

    if (renavamExists) {
        throw new CustomError('O renavam informado já encontra-se cadastrada no sistema', 422)
    }

    const clientExists = await getClientByUniqueAttribute('id', clientId)

    if (!clientExists) {
        throw new CustomError('O cliente informado não encontra-se cadastrado no sistema', 422)
    }

    const vehicle = await saveVehicle(req)

    vehicle.type = parseResTypeVehicle(vehicle.type)
    vehicle.fuel = Fuel[vehicle.fuel] as any
    res.status(201).json({
        vehicle
    })
}

const saveVehicle = async (req: Request) => {
    const {
        type,
        brand,
        model,
        yearManufacture,
        yearModel,
        color,
        chassi,
        renavam,
        fuel,
        value,
        odometer,
        licensePlate,
        tracker,
        trailer,
        alieneted,
        bank,
        financedAmount,
        engineCapacity,
        observations,
        vehicleConditions,
        secondDriver,
        clientId,
        vehicleOwner,
        documentNumberOwner,
        isSecondDriver
    }: ICreateVehicle = req.body

    try {
        const vehicle = await prismaClient.vehicle.create({
            data: {
                type: parseTypeVehicle(type),
                brand: brand,
                model: model,
                yearManufacture: Number(yearManufacture),
                yearModel: yearModel,
                color: color,
                chassi: chassi,
                renavam: renavam,
                vehicleOwner: vehicleOwner,
                documentNumberOwner: documentNumberOwner,
                fuel: Fuel[getKeyByEnum(Fuel, fuel)],
                value: regexValueMoneyNumberReplace(value),
                odometer: Number(odometer ?? 0),
                licensePlate: licensePlate,
                tracker: tracker,
                trailer: trailer,
                alieneted: alieneted,
                bank: bank,
                financedAmount: regexValueMoneyNumberReplace(financedAmount),
                engineCapacity: Number(engineCapacity ?? 0),
                observations: observations,
                ...(isSecondDriver && {
                    secondDriver: {
                        connectOrCreate: {
                            where: {
                                documentNumber: regexDocumentNumberReplace(secondDriver.documentNumber)
                            },
                            create: {
                                documentNumber: regexDocumentNumberReplace(secondDriver.documentNumber),
                                fullname: secondDriver.fullname,
                                licenseDocument: {
                                    connectOrCreate: {
                                        where: {
                                            licenseNumber: secondDriver.licenseDocument.licenseNumber
                                        },
                                        create: {
                                            licenseNumber: secondDriver.licenseDocument.licenseNumber,
                                            licenseCategory: secondDriver.licenseDocument.licenseCategory
                                        }
                                    }
                                },
                                birthDate: parse(secondDriver.birthDate, 'dd/MM/yyyy', Date.now()),
                                observations: secondDriver.observations
                            }
                        }
                    }
                }),
                client: {
                    connect: {
                        id: clientId
                    }
                }
            }
        })
        return vehicle
    } catch (error) {
        console.log(error)
        throw new CustomError('Erro ao cadastrar o veículo', 500)
    }
}

export { createVehicleController }
