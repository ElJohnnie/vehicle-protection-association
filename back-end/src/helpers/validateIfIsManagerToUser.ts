import { Role } from '@prisma/client'
import { CustomError } from './CustomError'
import { getToken } from './getToken'
import { getUserByToken } from './getUserByToken'

const validateIfIsManagerToUser = async (req, user) => {
    const token = getToken(req)
    const userToken = await getUserByToken(token)

    if (userToken.role === Role.MEDIUM) {
        if (
            !userToken.managerUnits.find(
                managerUnit =>
                    user.units.map(
                        unit => unit.businessUnitId === managerUnit.businessUnitId
                    )
            )
        ) {
            throw new CustomError('O usuário que deseja buscar não pertence a nenhuma de suas unidades', 422)
        }
    }
}

export { validateIfIsManagerToUser }
