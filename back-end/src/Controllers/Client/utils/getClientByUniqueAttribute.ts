import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getClientByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const client = await prismaClient.client.findUnique({
            where: {
                [attribute]: value
            },
            include: {
                address: true,
                identityDocument: true,
                licenseDocument: true,
                unit: true,
                vehicles: true
            }
        })
        return client
    } catch (error) {
        throw new CustomError('Erro ao consultar cliente', 500)
    }
}

export { getClientByUniqueAttribute }
