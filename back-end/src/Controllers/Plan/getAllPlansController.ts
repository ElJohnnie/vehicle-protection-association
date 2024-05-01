import { Request, Response, response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'

const getAllPlansController = async (req: Request, res: Response) => {
    const plans = await findAllPlans()

    if (plans) {
        plans.forEach((plan) => {
            plan.planPrices.forEach((item) => {
                item.value = Number((item.value / 100).toFixed(2))
            })
        })
    }

    res.status(200).json({
        plans
    })
}

const findAllPlans = async () => {
    try {
        const plans = await prismaClient.plan.findMany({
            include: {
                planPrices: true
            }
        })
        return plans
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os planos', 500)
    }
}

export { getAllPlansController }
