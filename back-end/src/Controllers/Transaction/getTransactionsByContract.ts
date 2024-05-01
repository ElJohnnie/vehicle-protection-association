import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getTransactionsPayController } from '../GalaxyPay/Transaction/getTransactionsPayController'

const getTransactionByContract = async (req:Request, res:Response) => {
    const id = req.params.id
    const { startAt, limit, status } = req.query

    const transactions = await getTransactionsPay(id, startAt, limit, status)

    res.status(200).json(
        transactions
    )
}

const getTransactionsPay = async (id, startAt, limit, status) => {
    const res = await getTransactionsPayController(id, startAt, limit, status)

    if (!res) {
        throw new CustomError('Erro ao buscar transações na plataforma do galax pay', 500)
    }

    return res
}

export { getTransactionByContract }
