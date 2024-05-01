import { Request, Response, response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getPlanByUniqueAttribute } from './utils/getPlanByUniqueAttribute'

const getPlanByIdController = async (req: Request, res: Response) => {
    const id = req.params.id
    const plan = await getPlanByUniqueAttribute('id', id)

    res.status(200).json({
        plan
    })
}

export { getPlanByIdController }
