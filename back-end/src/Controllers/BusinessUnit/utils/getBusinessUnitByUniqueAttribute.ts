import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getBusinessUnitByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const businessUnit = await prismaClient.businessUnit.findUnique({
            where: {
                [attribute]: value
            }
        })
        return businessUnit
    } catch (error) {
        throw new CustomError('Erro ao consultar unidades', 500)
    }
}

export { getBusinessUnitByUniqueAttribute }
