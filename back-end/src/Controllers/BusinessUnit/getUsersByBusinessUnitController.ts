import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'
import { verifyIfUserIsManagerToBusinnesUnit } from '../../helpers/verifyIfUserIsManagerToBusinnesUnit'

const getUsersByBusinessUnitController = async (req: Request, res: Response) => {
    const businessUnitId = req.params.id

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('A unidade informada não está cadastrada no sistema', 422)
    }

    await verifyIfUserIsManagerToBusinnesUnit(businessUnitId, req)

    const users = await getUsersByBusinessUnit(businessUnitId)

    const newUsers = users.map((user) => user.user)

    res.status(200).json({
        users: newUsers
    })
}

const getUsersByBusinessUnit = async (businessUnitId: string) => {
    try {
        const users = await prismaClient.userHasBusinessUnit.findMany({
            where: {
                businessUnitId: businessUnitId
            },
            include: {
                user: true
            }
        })
        return users
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os usuários da base', 500)
    }
}

export { getUsersByBusinessUnitController }
