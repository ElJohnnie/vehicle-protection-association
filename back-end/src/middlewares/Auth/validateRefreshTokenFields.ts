import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../helpers/CustomError'
import { IGenerateRefreshToken } from '../../utils/interface'

const validateRefreshTokenFields = (req: Request, res:Response, next:NextFunction) => {
    const { refreshToken }:IGenerateRefreshToken = req.body
    if (!refreshToken) {
        throw new CustomError('O refresh token obrigatório', 422)
    }

    next()
}

export { validateRefreshTokenFields }
