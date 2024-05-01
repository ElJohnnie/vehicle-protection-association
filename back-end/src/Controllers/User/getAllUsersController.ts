import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { CustomError } from '../../helpers/CustomError'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'

const getAllUsersController = async (req: Request, res: Response) => {
    const users = await findAllUsers()

    res.status(200).json({
        users
    })
}

const findAllUsers = async () => {
    try {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                fullname: true,
                email: true,
                documentNumber: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                managerUnits: true,
                units: true
            }
        })
        return users
    } catch (error) {
        throw new CustomError('Erro ao buscar todos os usuários', 500)
    }
}

export { getAllUsersController }
