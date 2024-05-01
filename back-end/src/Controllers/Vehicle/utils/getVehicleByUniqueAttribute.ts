import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getVehicleByUniqueAttribute = async (attribute: string, value: string) => {
    const secondDriverEmpty = {
        id: null,
        documentNumber: null,
        fullname: null,
        birthDate: null,
        observations: null,
        licenseDocument: {
            id: null,
            licenseNumber: null,
            licenseCategory: null,
            createdAt: null,
            updatedAt: null
        }
    }

    try {
        let vehicle:any = await prismaClient.vehicle.findUnique({
            where: {
                [attribute]: value
            },
            include: {
                client: {
                    include: {
                        licenseDocument: true
                    }
                },
                vehicleConditions: true,
                contract: true,
                events: true,
                secondDriver: {
                    select: {
                        documentNumber: true,
                        fullname: true,
                        birthDate: true,
                        observations: true,
                        licenseDocument: {
                            select: {
                                licenseNumber: true,
                                licenseCategory: true
                            }
                        }
                    }
                }
            }
        })

        if (vehicle) {
            if (!vehicle.secondDriver) { vehicle.secondDriver = secondDriverEmpty }

            vehicle = { ...vehicle, isSecondDriver: vehicle.secondDriver.id !== null }
        }
        return vehicle
    } catch (error) {
        throw new CustomError('Erro ao consultar veículos', 500)
    }
}

export { getVehicleByUniqueAttribute }
