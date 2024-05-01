import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getContractByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const contract = await prismaClient.contract.findUnique({
            where: {
                [attribute]: value
            },
            include: {
                plan: true,
                vehicle: true
            }
        })
        return contract
    } catch (error) {
        throw new CustomError('Erro ao consultar contrato', 500)
    }
}

export { getContractByUniqueAttribute }
