import { verify } from 'jsonwebtoken'
import 'dotenv/config'
import { Response } from 'express'
import { CustomError } from './CustomError'

const verifyRefreshToken = (refreshToken: string, res: Response) => {
    try {
        const verified = verify(refreshToken, process.env.JWT_SECRET)
        return verified
    } catch (error) {
        throw new CustomError('Refresh token inválido', 400)
    }
}

export { verifyRefreshToken }
