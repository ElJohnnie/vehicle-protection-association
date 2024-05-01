import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { IEditUser } from '../../utils/interface'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { excludeFieldUser } from './utils/excludeFieldUser'
import { regexDocumentNumberReplace } from '../../utils/mask'
import { getBusinessUnitByUniqueAttribute } from '../BusinessUnit/utils/getBusinessUnitByUniqueAttribute'

const editUserController = async (req: Request, res: Response) => {
    const { email, documentNumber, unitsIds }: IEditUser = req.body
    const id = req.params.id
    const user = await getUserByUniqueAttribute('id', id)

    if (!user) {
        throw new CustomError('O usuário que deseja atualizar não existe na base de dados', 422)
    }

    if (email !== user.email) {
        const emailExists = await getUserByUniqueAttribute('email', email)
        if (emailExists) {
            throw new CustomError('O e-mail informado já encontra-se cadastrado no sistema', 422)
        }
    }

    if (regexDocumentNumberReplace(documentNumber) !== user.documentNumber) {
        const documentNumberExists = await getUserByUniqueAttribute('documentNumber', regexDocumentNumberReplace(documentNumber))
        if (documentNumberExists) {
            throw new CustomError('O número do documento informado  já encontra-se cadastrado no sistema', 422)
        }
    }

    if (unitsIds.length > 0) {
        unitsIds.forEach(async (businessUnitId) => {
            const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)
            if (!businessUnit) {
                throw new CustomError('Uma das unidades informadas não está cadastrada no sistema', 422)
            }
        })
    }

    const userUpdate = excludeFieldUser(await updateUser(req), ['password'])

    res.status(200).json({
        user: userUpdate
    })
}

const updateUser = async (req: Request) => {
    const { fullname, email, documentNumber, role, unitsIds }: IEditUser = req.body
    const id = req.params.id
    try {
        const user = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                fullname: fullname,
                email: email,
                documentNumber: regexDocumentNumberReplace(documentNumber),
                role: role,
                ...(
                    unitsIds.length > 0 &&
                    {
                        units: {
                            deleteMany: {},
                            createMany: {
                                data: unitsIds.map((unit) => {
                                    return {
                                        businessUnitId: unit
                                    }
                                })
                            }
                        }
                    }
                )
            },
            include: {
                managerUnits: true,
                units: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao editar o usuário', 500)
    }
}

export { editUserController }
