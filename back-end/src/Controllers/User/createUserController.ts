import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { ICreateUser } from '../../utils/interface'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { Role } from '../../utils/enum'
import { encryptPassword } from '../../helpers/encriptyPassword'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { excludeFieldUser } from './utils/excludeFieldUser'
import { regexDocumentNumberReplace } from '../../utils/mask'
import { getBusinessUnitByUniqueAttribute } from '../BusinessUnit/utils/getBusinessUnitByUniqueAttribute'

const createUserController = async (req: Request, res: Response) => {
    const { email, documentNumber, unitsIds }: ICreateUser = req.body

    await verifyLevelRole(req)

    const userExists = await getUserByUniqueAttribute('email', email)

    if (userExists) {
        throw new CustomError('O e-mail informado já  encontra-se cadastrado no sistema', 422)
    }

    unitsIds.forEach(async (businessUnitId) => {
        const businessUnit = await getBusinessUnitByUniqueAttribute('id', businessUnitId)
        if (!businessUnit) {
            throw new CustomError('Uma das unidades informadas não está cadastrada no sistema', 422)
        }
    })

    const documentExists = await getUserByUniqueAttribute('documentNumber', regexDocumentNumberReplace(documentNumber))

    if (documentExists) {
        throw new CustomError('O número do documento informado já encontra-se cadastrado no sistema', 422)
    }

    const user = excludeFieldUser(await saveUser(req), ['password'])

    res.status(201).json({
        user
    })
}

const verifyLevelRole = async (req) => {
    const token = getToken(req)
    const user = await getUserByToken(token)
    const { role } = req.body

    if (
        (user.role === Role.MEDIUM && role === Role.HIGH) ||
        (user.role === Role.MEDIUM && role === Role.MEDIUM)
    ) {
        throw new CustomError('Acesso negado, sem permissão para utilizar este recurso', 401)
    }
}

const saveUser = async (req: Request) => {
    const { fullname, email, documentNumber, password, role, unitsIds }: ICreateUser = req.body
    try {
        const encryptedPass = await encryptPassword(password)
        const user = await prismaClient.user.create({
            data: {
                fullname: fullname,
                email: email,
                documentNumber: regexDocumentNumberReplace(documentNumber),
                password: encryptedPass,
                createdAt: new Date(),
                role: role,
                units: {
                    createMany: {
                        data: unitsIds.map((unit) => {
                            return {
                                businessUnitId: unit
                            }
                        })
                    }
                }
            },
            include: {
                managerUnits: true,
                units: true
            }
        })

        return user
    } catch (error) {
        throw new CustomError('Erro ao cadastrar o usuário', 500)
    }
}

export { createUserController }
