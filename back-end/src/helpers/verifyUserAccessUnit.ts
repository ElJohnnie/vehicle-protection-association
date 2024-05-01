import { getToken } from './getToken'
import { getUserByToken } from './getUserByToken'
import { CustomError } from './CustomError'
import { Role } from '../utils/enum'

const verifyUserAccessUnit = async (req, businessUnitId) => {
    const token = getToken(req)
    const userToken = await getUserByToken(token)

    if (userToken.role === Role.MEDIUM || userToken.role === Role.LOW) {
        if (
            (!userToken.managerUnits.find(item => item.businessUnitId === businessUnitId)) &&
            (!userToken.units.find(item => item.businessUnitId === businessUnitId))
        ) {
            throw new CustomError('Acesso negado, sem permissão para utilizar este recurso', 500)
        }
    }
}

export { verifyUserAccessUnit }
