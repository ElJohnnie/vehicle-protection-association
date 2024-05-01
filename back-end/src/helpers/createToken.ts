import { sign } from 'jsonwebtoken'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'
import { ICreateTokenUser } from '../utils/interface'

const createToken = async (user: ICreateTokenUser) => {
    const currentTime = (Date.now() / 1000).toString()
    const token = await sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
            fullname: user.fullname,
            isActive: user.isActive
        },
        process.env.JWT_SECRET,
        {
            issuer: 'teste',
            audience: 'vehicle-insurance',
            subject: user.id,
            notBefore: currentTime.split('.')[1],
            expiresIn: process.env.JWT_EXPIRE_TIME,
            keyid: uuidv4(),
            header: {
                typ: 'at+jwt',
                alg: 'HS256'
            }
        }
    )

    return token
}

export { createToken }
