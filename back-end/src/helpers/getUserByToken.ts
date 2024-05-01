import { CustomError } from './CustomError'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { prismaClient } from '../database/prismaClient'

const getUserByToken = async (token: string) => {
    if (!token) {
        throw new CustomError('Acesso negado', 401)
    }

    let verified

    try {
        verified = verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new CustomError('Token inválido', 400)
    }

    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: verified.sub.toString()
            },
            select: {
                id: true,
                fullname: true,
                email: true,
                documentNumber: true,
                password: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                units: true,
                managerUnits: true
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao buscar usuário logado na base de dados', 500)
    }
}

export { getUserByToken }
