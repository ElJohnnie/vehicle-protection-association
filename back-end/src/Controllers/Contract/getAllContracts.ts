import { Request, Response } from 'express'
import { getContractsPayController } from '../GalaxyPay/Contract/getContractsPayController'

const getAllContracts = async (req:Request, res:Response) => {
    const { startAt, limit, status } = req.query

    const contracts = await getContractsPayController(null, startAt, limit, status)

    res.status(200).json(
        contracts
    )
}

export { getAllContracts }
