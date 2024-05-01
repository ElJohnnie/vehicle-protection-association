import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'
import { verifyUserAccessUnit } from '../../helpers/verifyUserAccessUnit'

const getBusinessUnitByIdController = async (req: Request, res: Response) => {
    const id = req.params.id

    await verifyUserAccessUnit(req, id)

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', id)

    res.status(200).json({
        businessUnit
    })
}

export { getBusinessUnitByIdController }
