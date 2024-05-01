import { Request, Response } from 'express'
import { editTransactionPayController } from '../GalaxyPay/Transaction/editTransactionPayController'
import { CustomError } from '../../helpers/CustomError'

const editTransactionController = async (req:Request, res:Response) => {
    const transaction = await editTransactionPay(req)

    res.status(200).json(
        transaction
    )
}

const editTransactionPay = async (req) => {
    const res = await editTransactionPayController(req)

    if (!res) {
        throw new CustomError('Erro ao editar transação na plataforma do galax pay', 500)
    }

    return res
}

export { editTransactionController }
