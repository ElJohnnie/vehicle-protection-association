import { sign } from 'jsonwebtoken'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid'

interface IUser {
    id: string;
    email: string;
}

const createRefreshToken = async (user: IUser) => {
    const currentTime = (Date.now() / 1000).toString()
    const refreshToken = await sign(
        {},
        process.env.JWT_SECRET,
        {
            issuer: 'teste',
            audience: 'vehicle-insurance',
            subject: user.id,
            notBefore: currentTime.split('.')[1],
            expiresIn: '1800s',
            keyid: uuidv4(),
            header: {
                typ: 'rt+jwt',
                alg: 'HS256'
            }
        }
    )

    return refreshToken
}

export { createRefreshToken }
