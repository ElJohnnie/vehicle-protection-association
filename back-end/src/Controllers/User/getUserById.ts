import { Request, Response } from 'express'
import { getUserByUniqueAttribute } from './utils/getUserByUniqueAttribute'
import { CustomError } from '../../helpers/CustomError'
import { getToken } from '../../helpers/getToken'
import { getUserByToken } from '../../helpers/getUserByToken'
import { Role } from '../../utils/enum'
import { validateIfIsManagerToUser } from '../../helpers/validateIfIsManagerToUser'

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id

    let user = await getUserByUniqueAttribute('id', id)

    const unitsIds = []

    if (!user) {
        throw new CustomError('O usuário que deseja buscar não existe na base de dados', 422)
    }

    await validateIfIsManagerToUser(req, user)

    user.units.map(unit => unitsIds.push(unit.businessUnitId))

    user = { ...user, unitsIds: unitsIds } as any

    res.status(200).json(
        user
    )
}

export { getUserById }
