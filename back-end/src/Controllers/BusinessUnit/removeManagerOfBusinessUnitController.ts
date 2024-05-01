import { Request, Response } from 'express'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from '../User/utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'

const removeManagerOfBusinessUnitController = async (req: Request, res: Response) => {
    const { userId, businessUnitId } = req.body

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja remover o gerente não está cadastrada', 422)
    }

    const user = await getUserByUniqueAttribute('id', userId)

    if (!user) {
        throw new CustomError('O gerente que deseja remover não está cadastrado', 422)
    }

    const userIsManagerInBusinessUnit = await verifyIfUserIsAllocatedInBusinessUnit(req)

    if (!userIsManagerInBusinessUnit) {
        throw new CustomError('O usuário que deseja remover não é gerente da unidade', 422)
    }

    await deleteUserHasBusinessUnit(req)

    res.status(200).json({
        message: 'Sucesso ao remover gerente da unidade'
    })
}

const verifyIfUserIsAllocatedInBusinessUnit = async (req) => {
    const { userId, businessUnitId } = req.body

    try {
        const userHasBusinessUnit = await prismaClient.managerHasBusinessUnit.findFirst({
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
        throw new CustomError('Erro ao buscar o gerente da unidade', 500)
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
                managerUnits: {
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

export { removeManagerOfBusinessUnitController }
