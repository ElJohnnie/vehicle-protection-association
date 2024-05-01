import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getPlanByUniqueAttribute } from './utils/getPlanByUniqueAttribute'
import { deletePlanPayController } from '../GalaxyPay/Plan/deletePlanPayController'

const deletePlanController = async (req: Request, res: Response) => {
    const id = req.params.id

    const plan = await getPlanByUniqueAttribute('id', id)

    if (!plan) {
        throw new CustomError('O plano que deseja excluir não existe na base de dados', 422)
    }

    await deletePlanGalaxyPay(id)

    await deleteClient(id)

    res.status(200).json({
        message: 'Sucesso ao excluir o plano'
    })
}

const deleteClient = async (id: string) => {
    try {
        const clientDelete = await prismaClient.plan.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar o plano', 500)
    }
}

const deletePlanGalaxyPay = async (id: string) => {
    try {
        const response = await deletePlanPayController(
            id
        )

        if (!response.type) {
            throw new CustomError('Erro ao excluir o plano na plataforma galaxy pay', 500)
        }
    } catch (error) {
        throw new CustomError('Erro ao excluir o plano na plataforma galaxy pay', 500)
    }
}

export { deletePlanController }
