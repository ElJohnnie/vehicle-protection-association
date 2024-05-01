import { Role } from '@prisma/client'
import { prismaClient } from '../../src/database/prismaClient'
import { encryptPassword } from '../../src/helpers/encriptyPassword'
import { regexDocumentNumberReplace } from '../../src/utils/mask'
import { seedUnits } from './seedUnits'

const seedUsers = async () => {
    await seedUnits()

    await prismaClient.user.create({
        data: {
            id: 'high',
            fullname: 'User high',
            email: 'high@gmail.com',
            documentNumber: regexDocumentNumberReplace('616.534.596-46'),
            password: await encryptPassword('12345'),
            role: Role.HIGH,
            isActive: true
        }
    })

    await prismaClient.user.create({
        data: {
            id: 'medium',
            fullname: 'User medium',
            email: 'medium@gmail.com',
            documentNumber: regexDocumentNumberReplace('590.216.588-10'),
            password: await encryptPassword('12345'),
            role: Role.MEDIUM,
            isActive: true,
            managerUnits: {
                create: {
                    businessUnit: {
                        connect: {
                            id: 'unit_a'
                        }
                    }
                }
            }
        }
    })

    await prismaClient.user.create({
        data: {
            id: 'low',
            fullname: 'User low',
            email: 'low@gmail.com',
            documentNumber: regexDocumentNumberReplace('467.312.367-05'),
            password: await encryptPassword('12345'),
            role: Role.LOW,
            isActive: true,
            units: {
                create: {
                    businessUnit: {
                        connect: {
                            id: 'unit_b'
                        }
                    }
                }
            }
        }
    })
}

export { seedUsers }
