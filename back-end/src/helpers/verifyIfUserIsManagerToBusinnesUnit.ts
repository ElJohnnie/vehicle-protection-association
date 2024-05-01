import { Request } from 'express'
import { Role } from '../utils/enum'
import { CustomError } from './CustomError'
import { getToken } from './getToken'
import { getUserByToken } from './getUserByToken'

const verifyIfUserIsManagerToBusinnesUnit = async (businessUnitId, req) => {
    const token = getToken(req)
    const user = await getUserByToken(token)

    if (user.role === Role.MEDIUM) {
        if (!user.managerUnits.find(item => item.businessUnitId === businessUnitId)) {
            throw new CustomError('Acesso negado, sem permissão para utilizar este recurso', 401)
        }
    }
}

export { verifyIfUserIsManagerToBusinnesUnit }
