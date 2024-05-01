import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { IEditVehicle } from '../../utils/interface'
import { getVehicleByUniqueAttribute } from './utils/getVehicleByUniqueAttribute'
import { parse } from 'date-fns'
import { parseResTypeVehicle, parseTypeVehicle, regexValueMoneyNumberReplace } from '../../utils/mask'
import { getKeyByEnum } from '../../helpers/getKeysByEnum'
import { Fuel } from '../../utils/enum'

const editVehicleController = async (req: Request, res: Response) => {
    const id = req.params.id
    const { licensePlate, chassi, renavam }: IEditVehicle = req.body
    const vehicle = await getVehicleByUniqueAttribute('id', id)

    if (!vehicle) {
        throw new CustomError('O veículo que deseja atualizar não existe na base de dados', 422)
    }

    if (vehicle.licensePlate !== licensePlate) {
        const licensePlateExists = await getVehicleByUniqueAttribute('licensePlate', licensePlate)
        if (licensePlateExists) {
            throw new CustomError('A placa do veículo informado já encontra-se cadastrada no sistema', 422)
        }
    }

    if (vehicle.chassi !== chassi) {
        const chassiExists = await getVehicleByUniqueAttribute('chassi', chassi)
        if (chassiExists) {
            throw new CustomError('O chassi do veículo informado já encontra-se cadastrada no sistema', 422)
        }
    }

    if (vehicle.renavam !== renavam) {
        const renavamExists = await getVehicleByUniqueAttribute('renavam', renavam)
        if (renavamExists) {
            throw new CustomError('O renavam informado já encontra-se cadastrada no sistema', 422)
        }
    }

    const vehicleUpdate = await updateVehicle(req)

    vehicleUpdate.type = parseResTypeVehicle(vehicleUpdate.type)

    res.status(200).json({
        vehicleUpdate
    })
}

const updateVehicle = async (req: Request) => {
    const id = req.params.id

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
        isSecondDriver,
        vehicleOwner,
        documentNumberOwner
    }: IEditVehicle = req.body

    console.log('body ', req.body)

    try {
        let vehicle = await prismaClient.vehicle.update({
            where: {
                id: id
            },
            data: {
                type: parseTypeVehicle(type),
                brand: brand,
                model: model,
                yearManufacture: Number(yearManufacture),
                yearModel: String(yearModel),
                color: color,
                chassi: chassi,
                renavam: renavam,
                fuel: Fuel[getKeyByEnum(Fuel, fuel)],
                value: regexValueMoneyNumberReplace(String(value)),
                odometer: Number(odometer ?? 0),
                licensePlate: licensePlate,
                tracker: tracker,
                trailer: trailer,
                alieneted: alieneted,
                bank: bank,
                vehicleOwner: vehicleOwner,
                documentNumberOwner: documentNumberOwner,
                financedAmount: regexValueMoneyNumberReplace(String(financedAmount)),
                engineCapacity: Number(engineCapacity ?? 0),
                observations: observations,
                ...(isSecondDriver && {
                    secondDriver: {
                        update: {
                            documentNumber: secondDriver.documentNumber,
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
                })
            },
            include: {
                client: true,
                contract: true,
                events: true,
                secondDriver: true,
                vehicleConditions: true
            }
        })

        if (!isSecondDriver && vehicle.secondDriver !== null) {
            vehicle = await prismaClient.vehicle.update({
                where: {
                    id: id
                },
                data: {
                    secondDriver: {
                        disconnect: true
                    }
                },
                include: {
                    client: true,
                    contract: true,
                    events: true,
                    secondDriver: true,
                    vehicleConditions: true
                }
            })
        }

        if (isSecondDriver) {
            vehicle = await prismaClient.vehicle.update({
                where: {
                    id: id
                },
                data: {
                    secondDriver: {
                        update: {
                            licenseDocument: {
                                update: {
                                    licenseCategory: secondDriver.licenseDocument.licenseCategory
                                }
                            }
                        }
                    }
                },
                include: {
                    client: true,
                    contract: true,
                    events: true,
                    secondDriver: true,
                    vehicleConditions: true
                }
            })
        }
        return vehicle
    } catch (error) {
        console.log(error)
        throw new CustomError('Erro ao editar o veículo', 500)
    }
}

export { editVehicleController }
