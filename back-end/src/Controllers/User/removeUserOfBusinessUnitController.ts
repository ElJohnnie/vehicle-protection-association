import { Request, Response } from 'express'
import { getBusinessUnitByUniqueAttribute } from '../BusinessUnit/utils/getBusinessUnitByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { verifyIfUserIsManagerToBusinnesUnit } from '../../helpers/verifyIfUserIsManagerToBusinnesUnit'

const removeUserOfBusinessUnitController = async (req: Request, res: Response) => {
    const { userId, businessUnitId } = req.body

    await verifyIfUserIsManagerToBusinnesUnit(businessUnitId, req)

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja alocar o usuário não está cadastrada', 422)
    }

    const user = await getUserByUniqueAttribute('id', userId)

    if (!user) {
        throw new CustomError('O usuário que deseja remover não está cadastrado', 422)
    }

    const userIsAlocatedInBusinessUnit = await verifyIfUserIsAllocatedInBusinessUnit(req)

    if (!userIsAlocatedInBusinessUnit) {
        throw new CustomError('O usuário que deseja remover não está alocado na unidade', 422)
    }

    await deleteUserHasBusinessUnit(req)

    res.status(200).json({
        message: 'Sucesso ao desalocar o usuário da unidade'
    })
}

const verifyIfUserIsAllocatedInBusinessUnit = async (req) => {
    const { userId, businessUnitId } = req.body

    try {
        const userHasBusinessUnit = await prismaClient.userHasBusinessUnit.findFirst({
            where: {
                AND: [
                    {
                        businessUnitId: businessUnitId
                    },
                    {
                        userId: userId
                    }
                ]
            }
        })
        return userHasBusinessUnit
    } catch (error) {
        throw new CustomError('Erro ao buscar o usuário da unidade', 500)
    }
}

const deleteUserHasBusinessUnit = async (req: Request) => {
    const { userId, businessUnitId } = req.body

    try {
        await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                units: {
                    deleteMany: {
                        businessUnitId: businessUnitId
                    }
                }
            }
        })
    } catch (error) {
        throw new CustomError('Erro ao remover o usuário da unidade', 500)
    }
}

export { removeUserOfBusinessUnitController }
