import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { createRefreshToken } from '../../helpers/createRefreshToken'
import { createToken } from '../../helpers/createToken'
import { CustomError } from '../../helpers/CustomError'
import { verifyRefreshToken } from '../../helpers/verifyRefreshToken'
import { IGenerateRefreshToken } from '../../utils/interface'

const generateRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken }:IGenerateRefreshToken = req.body

    const tokenVerified = await verifyRefreshToken(refreshToken, res)

    if (!tokenVerified) {
        throw new CustomError('Token inválido', 400)
    }
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                id: tokenVerified.sub.toString()
            }
        })

        const newAT = await createToken(user)
        const newRT = await createRefreshToken(user)

        return res.status(200).json({
            accessToken: newAT,
            refreshToken: newRT
        })
    } catch (error) {
        throw new CustomError('Erro ao buscar email do usuário', 500)
    }
}

export { generateRefreshToken }
