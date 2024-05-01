import { Request, Response } from 'express'
import { getBusinessUnitByUniqueAttribute } from '../BusinessUnit/utils/getBusinessUnitByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { prismaClient } from '../../database/prismaClient'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { verifyIfUserIsManagerToBusinnesUnit } from '../../helpers/verifyIfUserIsManagerToBusinnesUnit'
import { Role } from '@prisma/client'

const addUserInBusinessUnitController = async (req: Request, res: Response) => {
    const { userId, businessUnitId } = req.body

    await verifyIfUserIsManagerToBusinnesUnit(businessUnitId, req)

    const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)

    if (!businessUnit) {
        throw new CustomError('A unidade que deseja alocar o usuário não está cadastrada', 422)
    }

    const user = await getUserByUniqueAttribute('id', userId)

    if (!user) {
        throw new CustomError('O usuário que deseja alocar não está cadastrado', 422)
    }

    verifyLevelRole(user.role)

    if (user.units.find(item => item.businessUnitId === businessUnitId && item.userId === user.id)) {
        throw new CustomError('O usuário já está alocado na unidade selecionada', 422)
    }

    await saveUserHasBusinessUnit(req)

    res.status(200).json({
        message: 'Usuário alocado a unidade com sucesso'
    })
}

const verifyLevelRole = (userRole) => {
    if (userRole === Role.HIGH) {
        throw new CustomError('Usuário do tipo administrador não pode ser alocado as bases', 422)
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
                units: {
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
                units: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao alocar o usuário na unidade', 500)
    }
}

export { addUserInBusinessUnitController }
