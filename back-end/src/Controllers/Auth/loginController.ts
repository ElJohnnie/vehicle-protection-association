import { Request, Response } from 'express'
import { prismaClient } from '../../database/prismaClient'
import { compare } from 'bcrypt'
import { createToken } from '../../helpers/createToken'
import { createRefreshToken } from '../../helpers/createRefreshToken'
import { CustomError } from '../../helpers/CustomError'
import { ILogin } from '../../utils/interface'

const loginController = async (req: Request, res: Response) => {
    const { email, password }:ILogin = req.body

    const user = await userExists(email)

    if (!user) {
        throw new CustomError('E-mail ou senha incorreta', 422)
    }

    const checkPassword = await compare(password, user.password)

    if (!checkPassword) {
        throw new CustomError('E-mail ou senha incorretos', 422)
    }

    if (!user.isActive) {
        throw new CustomError('Usuário inativo, para acessar o sistema precisa ser reativado', 401)
    }

    const newAT = await createToken(user)
    const newRT = await createRefreshToken(user)

    res.status(200).json({
        message: 'Login efetuado com sucesso',
        accessToken: newAT,
        refreshToken: newRT
    })
}

const userExists = async (email: string) => {
    try {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    } catch (error) {
        throw new CustomError('Erro ao buscar email do usuário', 500)
    }
}

export { loginController }
