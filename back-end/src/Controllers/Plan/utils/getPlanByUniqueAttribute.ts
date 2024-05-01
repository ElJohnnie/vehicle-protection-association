import { prismaClient } from '../../../database/prismaClient'
import { CustomError } from '../../../helpers/CustomError'

const getPlanByUniqueAttribute = async (attribute: string, value: string) => {
    try {
        const plan = await prismaClient.plan.findUnique({
            where: {
                [attribute]: value
            },
            include: {
                planPrices: true
            }
        })
        if (plan) {
            plan.planPrices.forEach((item) => {
                item.value = Number((item.value / 100).toFixed(2))
            })
        }
        return plan
    } catch (error) {
        throw new CustomError('Erro ao consultar plano', 500)
    }
}

export { getPlanByUniqueAttribute }
