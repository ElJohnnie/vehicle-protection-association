import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getPlanByUniqueAttribute } from './utils/getPlanByUniqueAttribute'
import { editPlanPayController } from '../GalaxyPay/Plan/editPlanPayController'

const editPlanController = async (req: Request, res: Response) => {
    const id = req.params.id
    const { name } = req.body

    const plan = await getPlanByUniqueAttribute('id', id)

    if (!plan) {
        throw new CustomError('O plano que deseja editar não está cadastrado', 422)
    }

    if (name.toLowerCase() !== plan.name.toLowerCase()) {
        const planNameExists = await getPlanByUniqueAttribute('name', name)
        if (planNameExists) {
            throw new CustomError('O nome informado já  encontra-se cadastrado no sistema', 422)
        }
    }

    await updatePlanGalaxyPay(req)
    const planUpdate = await updatePlan(req, res)

    res.status(200).json({
        plan: planUpdate
    })
}

const updatePlan = async (req: Request, res: Response) => {
    const { name, periodicity, quantity, additionalInfo, planPrices } = req.body

    const id = req.params.id

    planPrices.forEach((item) => {
        item.value = Math.ceil(Number(item.value) * 100)
    })

    try {
        const plan = await prismaClient.plan.update({
            where: {
                id: id
            },
            data: {
                name: name,
                periodicity: periodicity,
                quantity: quantity,
                additionalInfo: additionalInfo,
                planPrices: {
                    deleteMany: {},
                    createMany: {
                        data: planPrices
                    }
                }
            }
        })
        return plan
    } catch (error) {
        throw new CustomError('Erro ao editar o plano', 500)
    }
}

const updatePlanGalaxyPay = async (req: Request) => {
    try {
        const response = await editPlanPayController(
            req
        )

        if (!response.type) {
            throw new CustomError('Erro ao editar o plano na plataforma galaxy pay', 500)
        }

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar o plano na plataforma galaxy pay', 500)
    }
}

export { editPlanController }
