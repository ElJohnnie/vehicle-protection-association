import { Request, Response } from 'express'
import { getBusinessUnitByUniqueAttribute } from './utils/getBusinessUnitByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from '../User/utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'
import { Role } from '@prisma/client'

const addManagerInBusinessUnitController = async (req: Request, res: Response) => {
    const { userId, businessUnitId } = req.body

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja designar o gerente não está cadastrada', 422)
    }

    const user = await getUserByUniqueAttribute('id', userId)

    if (!user) {
        throw new CustomError('O usuário que deseja designar como gerente da unidade não está cadastrado', 422)
    }

    verifyLevelRole(user.role)

    if (user.managerUnits.find(item => item.businessUnitId === businessUnitId && item.userId === user.id)) {
        throw new CustomError('O usuário já é gerente da unidade selecionada', 422)
    }

    await saveUserHasBusinessUnit(req)

    res.status(200).json({
        message: 'Gerente designado a unidade com sucesso'
    })
}

const verifyLevelRole = (userRole) => {
    if (userRole === Role.HIGH || userRole === Role.LOW) {
        throw new CustomError('Apenas usuário de nível médio podem ser designados como gerentes nas unidades', 422)
    }
}

const saveUserHasBusinessUnit = async (req: Request) => {
    const { businessUnitId, userId } = req.body

    try {
        const user = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                managerUnits: {
                    create: {
                        businessUnit: {
                            connect: {
                                id: businessUnitId
                            }
                        }
                    }
                }
            },
            include: {
                managerUnits: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao designar o gerente da unidade', 500)
    }
}

export { addManagerInBusinessUnitController }
