import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getEventByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const user = await prismaClient.event.findUnique({
            where: {
                [attribute]: value
            },
            include: {
                address: true,
                vehicle: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao consultar veículos', 500)
    }
}

export { getEventByUniqueAttribute }
