import { Request, Response } from 'express'
import { getContractByUniqueAttribute } from './utils/getContractByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { cancelContractPayController } from '../GalaxyPay/Contract/cancelContractPayController'
import { prismaClient } from '../../database/prismaClient'

const deleteContractController = async (req:Request, res:Response) => {
    const id = req.params.id

    const contractExists = await getContractByUniqueAttribute('id', id)

    if (!contractExists) {
        throw new CustomError('O contrato que deseja excluir não existe na base de dados', 422)
    }

    const response = await cancelContractPayController(req)

    if (!res.type) {
        throw new CustomError('Erro ao cancelar o contrato na plataforma do galax pay', 500)
    }

    await deleteContract(req)

    res.status(200).json({
        message: 'Sucesso ao deletar contrato'
    })
}

const deleteContract = async (req:Request) => {
    const id = req.params.id
    try {
        await prismaClient.contract.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao deletar contrato', 500)
    }
}

export { deleteContractController }
