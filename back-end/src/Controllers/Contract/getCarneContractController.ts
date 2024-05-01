import { Request, Response } from 'express'
import { getCarneContractPayController } from '../GalaxyPay/Contract/getCarneContractPayController'
import { CustomError } from '../../helpers/CustomError'

const getCarneContractController = async (req:Request, res:Response) => {
    const id = req.params.id

    const carne = await getCarneContractPay(id)

    res.status(200).json(
        carne
    )
}

const getCarneContractPay = async (contractId) => {
    const res = await getCarneContractPayController(contractId)

    if (!res) {
        throw new CustomError('Erro ao gerar carne na plataforma do galax pay', 500)
    }

    return res
}

export { getCarneContractController }
