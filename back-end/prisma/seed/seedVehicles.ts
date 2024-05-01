import { parse } from 'date-fns'
import { prismaClient } from '../../src/database/prismaClient'
import { seedClients } from './seedClients'

const seedVehicles = async () => {
    await seedClients()

    await prismaClient.vehicle.create({
        data: {
            id: 'vehicle_a',
            type: 'CAR',
            brand: 'volkswagen',
            model: 'GOL 1.0',
            yearManufacture: 2012,
            yearModel: '2012',
            color: 'azul',
            chassi: '1321311233123213131332132321213321',
            renavam: '3121231132131312132321321',
            fuel: 'GASOLINE',
            value: 12500.35,
            odometer: 125000,
            licensePlate: 'IOTRA3TR321',
            tracker: true,
            trailer: true,
            alieneted: true,
            bank: 'banco do brasil',
            financedAmount: 12500,
            engineCapacity: 125,
            observations: 'qualquer texto',
            vehicleOwner: 'Jesus Cristo',
            documentNumberOwner: '111.111.111-11',
            vehicleConditions: {
                create: {
                    dentedTank: true,
                    brokenExhaust: true,
                    goodCondition: true,
                    damagedTaillights: true,
                    damagedHeadlights: true
                }
            },
            secondDriver: {
                create: {
                    documentNumber: '1234',
                    fullname: 'etste',
                    licenseDocument: {
                        create: {
                            licenseNumber: '1234567890',
                            licenseCategory: 'AB'
                        }
                    },
                    birthDate: parse('12/08/2001', 'dd/MM/yyyy', Date.now()),
                    observations: 'qualquer texto'
                }
            },
            client: {
                connect: {
                    id: 'client_a'
                }
            }
        }
    })
}

export { seedVehicles }
