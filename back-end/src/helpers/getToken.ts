import { Request } from 'express'
import { CustomError } from './CustomError'

const getToken = (req: Request) => {
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization
        const token = authHeader.split(' ')[1]

        return token
    }
    throw new CustomError('Token ausente', 400)
}

export { getToken }
