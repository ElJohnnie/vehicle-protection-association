import { genSalt, hash } from 'bcrypt'
import { CustomError } from './CustomError'

const encryptPassword = async (password: string) => {
    try {
        const salt = await genSalt(12)
        const passHash = await hash(password, salt)
        return passHash
    } catch (error) {
        throw new CustomError('Erro ao encriptar senha do usuário', 500)
    }
}

export { encryptPassword }
