import { Request, Response } from 'express'
import { editContractPayController } from '../GalaxyPay/Contract/editContractPayController'
import { IEditContractPay } from '../../utils/interface'
import { CustomError } from '../../helpers/CustomError'
import { getPlanByUniqueAttribute } from '../Plan/utils/getPlanByUniqueAttribute'
import { getContractByUniqueAttribute } from './utils/getContractByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'

const editContractController = async (req: Request, res: Response) => {
    const id = req.params.id
    const { planMyId }:IEditContractPay = req.body

    const contractExists = await getContractByUniqueAttribute('id', id)

    if (!contractExists) {
        throw new CustomError('O contrato que deseja atualizar não existe na base de dados', 422)
    }

    if (planMyId && planMyId !== undefined) {
        const planExists = await getPlanByUniqueAttribute('id', planMyId)

        if (!planExists) {
            throw new CustomError('O plano informado não está cadastrado no sistema', 422)
        }
    }

    const contract = await editContractGalaxPay({ ...req.body, id: req.params.id })

    await updateContract(req)

    res.status(200).json(
        contract
    )
}

const updateContract = async (req:Request) => {
    const id = req.params.id
    const { planMyId } = req.body

    try {
        await prismaClient.contract.update({
            where: {
                id: id
            },
            data: {
                ...(planMyId
                    ? {
                        plan: {
                            connect: {
                                id: planMyId
                            }
                        }
                    }
                    : {
                        plan: {
                            disconnect: true
                        }
                    })
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao editar o contrato', 500)
    }
}

const editContractGalaxPay = async (contract: IEditContractPay) => {
    try {
        const response = await editContractPayController(contract)

        if (!response) {
            throw new CustomError('Erro ao editar o contrato na plataforma galax pay', 500)
        }

        return response
    } catch (error) {
        throw new CustomError('Erro ao editar o contrato na plataforma galax pay', 500)
    }
}

export { editContractController }
