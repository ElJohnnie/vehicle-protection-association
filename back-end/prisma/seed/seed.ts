import { prismaClient } from '../../src/database/prismaClient'
import { seedClients } from './seedClients'
import { seedPlans } from './seedPlans'
import { seedUnits } from './seedUnits'
import { seedUsers } from './seedUsers'
import { seedVehicles } from './seedVehicles'

seedUsers()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })

seedPlans()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })

seedVehicles()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })
