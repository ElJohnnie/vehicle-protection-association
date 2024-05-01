import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getUserByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                [attribute]: value
            },
            select: {
                id: true,
                fullname: true,
                email: true,
                documentNumber: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                units: true,
                managerUnits: true,
                isActive: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao consultar usuários', 500)
    }
}

export { getUserByUniqueAttribute }
