import { Request, Response } from 'express'
import { getPlanByUniqueAttribute } from './utils/getPlanByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { prismaClient } from '../../database/prismaClient'
import { createPlanPayController } from '../GalaxyPay/Plan/createPlanPayController'
import { ICreatePlan } from '../../utils/interface'

const createPlanController = async (req: Request, res:Response) => {
    const { name } = req.body

    const planExists = await getPlanByUniqueAttribute('name', name)

    if (planExists) {
        throw new CustomError('O nome do plano que deseja cadastrar já encontra-se cadastrado', 422)
    }

    const plan = await savePlan(req)

    res.status(201).json(
        plan
    )
}

const savePlan = async (req) => {
    const { name, periodicity, quantity, additionalInfo, planPrices }:ICreatePlan = req.body

    planPrices.forEach((item) => {
        item.value = Math.ceil(Number(item.value) * 100)
    })

    let planId

    try {
        const plan = await prismaClient.plan.create({
            data: {
                name: name,
                periodicity: periodicity,
                quantity: quantity,
                additionalInfo: additionalInfo,
                planPrices: {
                    createMany: {
                        data: planPrices
                    }
                }
            },
            include: {
                planPrices: true
            }
        })
        planId = plan.id
        await savePlanGalaxyPay(plan)
        return plan
    } catch (error) {
        await prismaClient.plan.delete({
            where: {
                id: planId
            }
        })
        throw new CustomError('Erro ao cadastrar o plano', 500)
    }
}

const savePlanGalaxyPay = async (plan) => {
    try {
        const response = await createPlanPayController(
            plan
        )

        if (!response.type) {
            throw new CustomError('Erro ao cadastrar o plano na plataforma galaxy pay', 500)
        }
        return response
    } catch (error) {
        throw new CustomError('Erro ao cadastrar o plano na plataforma galaxy pay', 500)
    }
}

export { createPlanController }
