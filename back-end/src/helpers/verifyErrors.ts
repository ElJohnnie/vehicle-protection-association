import { Request, Response, NextFunction } from 'express'
import { CustomError } from './CustomError'

const verifyErrors = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log('🚀 ~ file: verifyErrors.ts:5 ~ verifyErrors ~ error:', error)
    return res.status(error.statusCode).json({
        message: error.message
    })
}

export { verifyErrors }
